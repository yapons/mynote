// Note Management System - JavaScript Implementation

class NoteManager {
    constructor() {
        this.notes = this.loadNotes();
        this.currentNote = null;
        this.isEditing = false;
        this.folders = ['modules', 'core', 'logs'];
        this.init();
    }

    init() {
        this.renderNotes();
        this.updateSidebar();
        this.updateStatusBar();
        this.setupEventListeners();
        this.loadSampleData();
    }

    setupEventListeners() {
        // Form submission
        document.getElementById('noteForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveNote();
        });

        // Modal close on outside click
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('createModal');
            if (e.target === modal) {
                this.closeCreateForm();
            }
        });
    }

    loadSampleData() {
        // Load sample data if no notes exist
        if (this.notes.length === 0) {
            const sampleNotes = [
                {
                    id: this.generateId(),
                    moduleName: 'BOOKING',
                    folder: 'modules',
                    description: 'Modul untuk handle booking service customer',
                    files: `Controller:
- app/Http/Controllers/BookingController.php

Service:
- app/Services/BookingService.php

Model:
- app/Models/Booking.php
- app/Models/Customer.php

View:
- resources/views/booking/index.blade.php
- resources/views/booking/form.blade.php

Route:
- routes/web.php → /booking`,
                    flow: `User → BookingController@index
     → BookingService@getAll()
     → Booking Model
     → return View

Create Booking:
User → form → store()
     → validate
     → save booking
     → trigger invoice`,
                    dependency: `- Customer Module
- Payment Module
- Notification Module`,
                    database: `Table: bookings

Fields:
- id
- customer_id
- booking_date
- status

Relasi:
- bookings.customer_id → customers.id`,
                    api: `GET /api/booking
POST /api/booking`,
                    logs: `2026-04-20:
- Fix bug duplicate booking

2026-04-18:
- Add validation booking date`,
                    todo: `- Add cancel booking
- Add reschedule`,
                    history: `v1.0:
- Initial booking module

v1.1:
- Add invoice integration`,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                },
                {
                    id: this.generateId(),
                    moduleName: 'DATABASE',
                    folder: 'core',
                    description: 'Konfigurasi koneksi database aplikasi',
                    files: `- .env
- config/database.php`,
                    flow: `App → config/database.php → env → connect DB`,
                    dependency: `- Semua module menggunakan database`,
                    database: `DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=app_db
DB_USERNAME=root`,
                    api: '',
                    logs: `2026-04-15:
- Error connection timeout → fix port`,
                    todo: `- Setup replication
- Setup backup`,
                    history: `v1.0:
- Initial database setup`,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            ];
            
            this.notes = sampleNotes;
            this.saveNotes();
            this.renderNotes();
            this.updateSidebar();
            this.updateStatusBar();
        }
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    loadNotes() {
        const notes = localStorage.getItem('documentationNotes');
        return notes ? JSON.parse(notes) : [];
    }

    saveNotes() {
        localStorage.setItem('documentationNotes', JSON.stringify(this.notes));
    }

    showCreateForm() {
        document.getElementById('modalTitle').textContent = 'Buat Catatan Baru';
        document.getElementById('noteForm').reset();
        document.getElementById('createModal').style.display = 'block';
        this.isEditing = false;
        this.currentNote = null;
    }

    closeCreateForm() {
        document.getElementById('createModal').style.display = 'none';
        this.isEditing = false;
        this.currentNote = null;
    }

    saveNote() {
        const formData = new FormData(document.getElementById('noteForm'));
        const noteData = {
            moduleName: document.getElementById('moduleName').value.trim(),
            folder: document.getElementById('folderSelect').value,
            description: document.getElementById('description').value.trim(),
            files: document.getElementById('files').value.trim(),
            flow: document.getElementById('flow').value.trim(),
            dependency: document.getElementById('dependency').value.trim(),
            database: document.getElementById('database').value.trim(),
            api: document.getElementById('api').value.trim(),
            logs: document.getElementById('logs').value.trim(),
            todo: document.getElementById('todo').value.trim(),
            history: document.getElementById('history').value.trim()
        };

        // Validation
        if (!noteData.moduleName || !noteData.folder || !noteData.description) {
            this.showToast('Mohon isi Nama Module, Folder, dan Deskripsi', 'error');
            return;
        }

        if (this.isEditing && this.currentNote) {
            // Update existing note
            const index = this.notes.findIndex(note => note.id === this.currentNote.id);
            if (index !== -1) {
                this.notes[index] = {
                    ...this.currentNote,
                    ...noteData,
                    updatedAt: new Date().toISOString()
                };
                this.showToast('Catatan berhasil diupdate!', 'success');
            }
        } else {
            // Create new note
            const newNote = {
                id: this.generateId(),
                ...noteData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            this.notes.push(newNote);
            this.showToast('Catatan berhasil dibuat!', 'success');
        }

        this.saveNotes();
        this.renderNotes();
        this.updateSidebar();
        this.updateStatusBar();
        this.closeCreateForm();
    }

    editNote(noteId) {
        const note = this.notes.find(n => n.id === noteId);
        if (!note) return;

        this.currentNote = note;
        this.isEditing = true;

        // Fill form with note data
        document.getElementById('modalTitle').textContent = 'Edit Catatan';
        document.getElementById('moduleName').value = note.moduleName;
        document.getElementById('folderSelect').value = note.folder;
        document.getElementById('description').value = note.description;
        document.getElementById('files').value = note.files || '';
        document.getElementById('flow').value = note.flow || '';
        document.getElementById('dependency').value = note.dependency || '';
        document.getElementById('database').value = note.database || '';
        document.getElementById('api').value = note.api || '';
        document.getElementById('logs').value = note.logs || '';
        document.getElementById('todo').value = note.todo || '';
        document.getElementById('history').value = note.history || '';

        document.getElementById('createModal').style.display = 'block';
    }

    deleteNote(noteId) {
        if (confirm('Apakah Anda yakin ingin menghapus catatan ini?')) {
            this.notes = this.notes.filter(note => note.id !== noteId);
            this.saveNotes();
            this.renderNotes();
            this.updateSidebar();
            this.updateStatusBar();
            this.closeNoteViewer();
            this.showToast('Catatan berhasil dihapus!', 'success');
        }
    }

    viewNote(noteId) {
        const note = this.notes.find(n => n.id === noteId);
        if (!note) return;

        this.currentNote = note;
        
        const content = this.formatNoteContent(note);
        document.getElementById('noteContent').innerHTML = content;
        document.getElementById('notesGrid').style.display = 'none';
        document.getElementById('noteViewer').style.display = 'block';
    }

    formatNoteContent(note) {
        const formatSection = (title, content) => {
            if (!content || content.trim() === '') return '';
            return `
                <h3>${title}</h3>
                <pre>${content}</pre>
            `;
        };

        return `
            <h2>[MODULE] ${note.moduleName}</h2>
            <div class="note-meta">
                <span>📁 ${note.folder}/</span>
                <span>📅 ${new Date(note.updatedAt).toLocaleDateString('id-ID')}</span>
            </div>

            <h3>[DESC]</h3>
            <pre>${note.description}</pre>

            ${formatSection('[FILES]', note.files)}
            ${formatSection('[FLOW]', note.flow)}
            ${formatSection('[DEPENDENCY]', note.dependency)}
            ${formatSection('[DB]', note.database)}
            ${formatSection('[API]', note.api)}
            ${formatSection('[LOG]', note.logs)}
            ${formatSection('[TODO]', note.todo)}
            ${formatSection('[HISTORY]', note.history)}
        `;
    }

    closeNoteViewer() {
        document.getElementById('noteViewer').style.display = 'none';
        document.getElementById('notesGrid').style.display = 'grid';
        this.currentNote = null;
    }

    editCurrentNote() {
        if (this.currentNote) {
            this.closeNoteViewer();
            this.editNote(this.currentNote.id);
        }
    }

    deleteCurrentNote() {
        if (this.currentNote) {
            this.deleteNote(this.currentNote.id);
        }
    }

    renderNotes(notesToRender = null) {
        const notes = notesToRender || this.notes;
        const grid = document.getElementById('notesGrid');
        
        if (notes.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <h3>📝 Belum ada catatan</h3>
                    <p>Mulai dengan membuat catatan dokumentasi pertama Anda</p>
                    <button class="btn btn-primary" onclick="noteManager.showCreateForm()">Buat Catatan Baru</button>
                </div>
            `;
            return;
        }

        grid.innerHTML = notes.map(note => `
            <div class="note-card" onclick="noteManager.viewNote('${note.id}')">
                <h3>
                    📄 ${note.moduleName}
                    <span class="folder-badge">${note.folder}</span>
                </h3>
                <p>${note.description}</p>
                <div class="note-meta">
                    <span>📅 ${new Date(note.updatedAt).toLocaleDateString('id-ID')}</span>
                    <span>
                        <button class="btn btn-secondary" onclick="event.stopPropagation(); noteManager.editNote('${note.id}')" style="padding: 5px 8px; font-size: 12px;">✏️ Edit</button>
                        <button class="btn btn-danger" onclick="event.stopPropagation(); noteManager.deleteNote('${note.id}')" style="padding: 5px 8px; font-size: 12px;">🗑️</button>
                    </span>
                </div>
            </div>
        `).join('');
    }

    updateSidebar() {
        this.folders.forEach(folder => {
            const folderNotes = this.notes.filter(note => note.folder === folder);
            const container = document.getElementById(`${folder}-items`);
            
            container.innerHTML = folderNotes.map(note => `
                <div class="folder-item" onclick="noteManager.viewNote('${note.id}')">
                    📄 ${note.moduleName.toLowerCase()}.txt
                </div>
            `).join('');
        });
    }

    updateStatusBar() {
        document.getElementById('noteCount').textContent = `${this.notes.length} catatan`;
    }

    searchNotes() {
        const query = document.getElementById('searchInput').value.toLowerCase();
        const folderFilter = document.getElementById('folderFilter').value;
        
        let filteredNotes = this.notes;

        // Filter by folder
        if (folderFilter) {
            filteredNotes = filteredNotes.filter(note => note.folder === folderFilter);
        }

        // Filter by search query
        if (query) {
            filteredNotes = filteredNotes.filter(note => 
                note.moduleName.toLowerCase().includes(query) ||
                note.description.toLowerCase().includes(query) ||
                note.files.toLowerCase().includes(query) ||
                note.flow.toLowerCase().includes(query) ||
                note.dependency.toLowerCase().includes(query) ||
                note.database.toLowerCase().includes(query) ||
                note.api.toLowerCase().includes(query) ||
                note.logs.toLowerCase().includes(query) ||
                note.todo.toLowerCase().includes(query) ||
                note.history.toLowerCase().includes(query)
            );
        }

        this.renderNotes(filteredNotes);
        
        // Update status
        if (query || folderFilter) {
            document.getElementById('statusText').textContent = 
                `Menampilkan ${filteredNotes.length} dari ${this.notes.length} catatan`;
        } else {
            document.getElementById('statusText').textContent = 'Siap';
        }
    }

    filterByFolder() {
        this.searchNotes();
    }

    toggleFolderView() {
        const sidebar = document.getElementById('sidebar');
        sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
    }

    exportData() {
        const data = {
            notes: this.notes,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dokumentasi-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showToast('Data berhasil diekspor!', 'success');
    }

    importData() {
        document.getElementById('importFile').click();
    }

    handleImportFile(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                if (data.notes && Array.isArray(data.notes)) {
                    if (confirm('Import akan mengganti semua data yang ada. Lanjutkan?')) {
                        this.notes = data.notes;
                        this.saveNotes();
                        this.renderNotes();
                        this.updateSidebar();
                        this.updateStatusBar();
                        this.showToast('Data berhasil diimpor!', 'success');
                    }
                } else {
                    this.showToast('Format file tidak valid!', 'error');
                }
            } catch (error) {
                this.showToast('Error membaca file: ' + error.message, 'error');
            }
        };
        reader.readAsText(file);
        
        // Reset input
        event.target.value = '';
    }

    showToast(message, type = 'success') {
        // Remove existing toasts
        const existingToasts = document.querySelectorAll('.toast');
        existingToasts.forEach(toast => toast.remove());

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Hide and remove toast
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Global functions for HTML onclick events
function showCreateForm() {
    noteManager.showCreateForm();
}

function closeCreateForm() {
    noteManager.closeCreateForm();
}

function closeNoteViewer() {
    noteManager.closeNoteViewer();
}

function editCurrentNote() {
    noteManager.editCurrentNote();
}

function deleteCurrentNote() {
    noteManager.deleteCurrentNote();
}

function toggleFolderView() {
    noteManager.toggleFolderView();
}

function exportData() {
    noteManager.exportData();
}

function importData() {
    noteManager.importData();
}

function handleImportFile(event) {
    noteManager.handleImportFile(event);
}

function searchNotes() {
    noteManager.searchNotes();
}

function filterByFolder() {
    noteManager.filterByFolder();
}

// Initialize the application
let noteManager;
document.addEventListener('DOMContentLoaded', () => {
    noteManager = new NoteManager();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + N for new note
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        noteManager.showCreateForm();
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        const modal = document.getElementById('createModal');
        if (modal.style.display === 'block') {
            noteManager.closeCreateForm();
        }
        
        const viewer = document.getElementById('noteViewer');
        if (viewer.style.display === 'block') {
            noteManager.closeNoteViewer();
        }
    }
    
    // Ctrl/Cmd + F for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
});