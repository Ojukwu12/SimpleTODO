// Modern Todo List Application
// Features: LocalStorage persistence, filtering, statistics, and keyboard shortcuts

class TodoApp {
  constructor() {
    this.tasks = this.loadTasks();
    this.currentFilter = 'all';
    this.init();
  }

  init() {
    this.cacheDOMElements();
    this.bindEvents();
    this.renderTasks();
    this.updateStats();
    this.checkEmptyState();
  }

  cacheDOMElements() {
    this.taskInput = document.getElementById('taskInput');
    this.addTaskBtn = document.getElementById('addTaskBtn');
    this.taskList = document.getElementById('taskList');
    this.emptyState = document.getElementById('emptyState');
    this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
    this.filterBtns = document.querySelectorAll('.filter-btn');
    this.totalTasksEl = document.getElementById('totalTasks');
    this.activeTasksEl = document.getElementById('activeTasks');
    this.completedTasksEl = document.getElementById('completedTasks');
    this.toast = document.getElementById('toast');
    this.a11yLive = document.getElementById('a11yLive');
    
    // Modal elements
    this.modal = document.getElementById('confirmModal');
    this.modalMessage = document.getElementById('modalMessage');
    this.modalConfirm = document.getElementById('modalConfirm');
    this.modalCancel = document.getElementById('modalCancel');
  }

  bindEvents() {
    // Add task events
    this.addTaskBtn.addEventListener('click', () => this.addTask());
    this.taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addTask();
    });

    // Filter events
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.currentFilter = e.target.dataset.filter;
        this.updateFilterButtons();
        this.renderTasks();
      });
    });

    // Clear completed
    this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
    
    // Modal events
    this.modalCancel.addEventListener('click', () => this.hideModal());
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.hideModal();
    });

    // Keyboard shortcuts: Ctrl/Cmd+K focuses input, '/' focuses input too
    document.addEventListener('keydown', (e) => {
      const activeTag = document.activeElement && document.activeElement.tagName;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.taskInput.focus();
      }

      if (e.key === '/' && activeTag !== 'INPUT' && activeTag !== 'TEXTAREA') {
        e.preventDefault();
        this.taskInput.focus();
      }
    });
  }

  addTask() {
    const taskText = this.taskInput.value.trim();
    
    if (taskText === '') {
      this.showInputError();
      return;
    }

    const task = {
      id: Date.now(),
      text: taskText,
      completed: false,
      createdAt: new Date().toISOString()
    };

    this.tasks.unshift(task);
    this.saveTasks();
    this.renderTasks();
    this.updateStats();
    this.checkEmptyState();
    
    // Clear input and add success animation
    this.taskInput.value = '';
    this.taskInput.classList.remove('error');
    this.addTaskBtn.classList.add('success-pulse');
    setTimeout(() => this.addTaskBtn.classList.remove('success-pulse'), 300);

    this.showToast('Task added');
  }

  showInputError() {
    this.taskInput.classList.add('error');
    this.taskInput.placeholder = 'Please enter a task!';
    setTimeout(() => {
      this.taskInput.classList.remove('error');
      this.taskInput.placeholder = 'What needs to be done?';
    }, 1500);
  }

  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
      this.renderTasks();
      this.updateStats();
      this.checkClearButton();
    }
  }

  deleteTask(id) {
    this.showModal(
      'Are you sure you want to delete this task?',
      () => {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveTasks();
        this.renderTasks();
        this.updateStats();
        this.checkEmptyState();
        this.checkClearButton();
        this.showToast('Task deleted');
      }
    );
  }

  editTask(id, newText) {
    const task = this.tasks.find(t => t.id === id);
    if (task && newText.trim() !== '') {
      task.text = newText.trim();
      this.saveTasks();
      this.renderTasks();
    }
  }

  clearCompleted() {
    const completedCount = this.tasks.filter(t => t.completed).length;
    if (completedCount === 0) return;
    
    this.showModal(
      `Delete ${completedCount} completed task${completedCount > 1 ? 's' : ''}?`,
      () => {
        this.tasks = this.tasks.filter(t => !t.completed);
        this.saveTasks();
        this.renderTasks();
        this.updateStats();
        this.checkEmptyState();
        this.checkClearButton();
        this.showToast(`${completedCount} completed removed`);
      }
    );
  }

  getFilteredTasks() {
    switch (this.currentFilter) {
      case 'active':
        return this.tasks.filter(t => !t.completed);
      case 'completed':
        return this.tasks.filter(t => t.completed);
      default:
        return this.tasks;
    }
  }

  renderTasks() {
    const filteredTasks = this.getFilteredTasks();
    
    this.taskList.innerHTML = '';
    
    filteredTasks.forEach(task => {
      const li = this.createTaskElement(task);
      this.taskList.appendChild(li);
    });

    this.checkClearButton();
  }

  createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.dataset.id = task.id;
    li.setAttribute('role', 'listitem');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;
    checkbox.setAttribute('aria-label', 'Mark task as complete');
    checkbox.addEventListener('change', () => this.toggleTask(task.id));

    const taskLabel = document.createElement('span');
    taskLabel.className = 'task-text';
    taskLabel.textContent = task.text;
    taskLabel.setAttribute('contenteditable', 'false');
    
    // Double-click to edit
    taskLabel.addEventListener('dblclick', () => {
      taskLabel.setAttribute('contenteditable', 'true');
      taskLabel.focus();
      this.selectAllText(taskLabel);
    });

    taskLabel.addEventListener('blur', () => {
      taskLabel.setAttribute('contenteditable', 'false');
      this.editTask(task.id, taskLabel.textContent);
    });

    taskLabel.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        taskLabel.blur();
      }
    });

    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'button-group';

    const editButton = document.createElement('button');
    editButton.className = 'btn-edit';
    editButton.innerHTML = '✏️';
    editButton.setAttribute('aria-label', 'Edit task');
    editButton.addEventListener('click', () => {
      taskLabel.setAttribute('contenteditable', 'true');
      taskLabel.focus();
      this.selectAllText(taskLabel);
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn-delete';
    deleteButton.innerHTML = '🗑️';
    deleteButton.setAttribute('aria-label', 'Delete task');
    deleteButton.addEventListener('click', () => this.deleteTask(task.id));

    buttonGroup.appendChild(editButton);
    buttonGroup.appendChild(deleteButton);

    li.appendChild(checkbox);
    li.appendChild(taskLabel);
    li.appendChild(buttonGroup);

    // Add animation
    setTimeout(() => li.classList.add('fade-in'), 10);

    return li;
  }

  selectAllText(element) {
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  updateFilterButtons() {
    this.filterBtns.forEach(btn => {
      if (btn.dataset.filter === this.currentFilter) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  updateStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const active = total - completed;

    this.totalTasksEl.textContent = total;
    this.activeTasksEl.textContent = active;
    this.completedTasksEl.textContent = completed;
  }

  checkEmptyState() {
    const filteredTasks = this.getFilteredTasks();
    if (filteredTasks.length === 0) {
      this.emptyState.style.display = 'block';
      this.taskList.style.display = 'none';
    } else {
      this.emptyState.style.display = 'none';
      this.taskList.style.display = 'block';
    }
  }

  checkClearButton() {
    const hasCompleted = this.tasks.some(t => t.completed);
    this.clearCompletedBtn.style.display = hasCompleted ? 'block' : 'none';
  }

  // LocalStorage methods
  saveTasks() {
    try {
      localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
    } catch (error) {
      console.error('Failed to save tasks to localStorage:', error);
    }
  }

  loadTasks() {
    try {
      const tasks = localStorage.getItem('todoTasks');
      return tasks ? JSON.parse(tasks) : [];
    } catch (error) {
      console.error('Failed to load tasks from localStorage:', error);
      return [];
    }
  }

  // Modal methods
  showModal(message, onConfirm) {
    this.modalMessage.textContent = message;
    this.modal.classList.add('show');
    
    // Remove previous confirm handler and add new one
    const newConfirmBtn = this.modalConfirm.cloneNode(true);
    this.modalConfirm.parentNode.replaceChild(newConfirmBtn, this.modalConfirm);
    this.modalConfirm = newConfirmBtn;
    
    this.modalConfirm.addEventListener('click', () => {
      onConfirm();
      this.hideModal();
    });
    
    // Close on Escape key
    this.escapeHandler = (e) => {
      if (e.key === 'Escape') this.hideModal();
    };
    document.addEventListener('keydown', this.escapeHandler);
  }

  hideModal() {
    this.modal.classList.remove('show');
    if (this.escapeHandler) {
      document.removeEventListener('keydown', this.escapeHandler);
      this.escapeHandler = null;
    }
  }

  // Toast / accessibility helpers
  showToast(message, duration = 2200) {
    try {
      if (this.toast) {
        this.toast.textContent = message;
        this.toast.classList.add('show');
        // reflect to screen readers
        if (this.a11yLive) this.a11yLive.textContent = message;
        clearTimeout(this._toastTimeout);
        this._toastTimeout = setTimeout(() => {
          this.toast.classList.remove('show');
        }, duration);
      }
    } catch (err) {
      // ignore toast errors
      console.error('Toast error', err);
    }
  }
}

// Initialize the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new TodoApp());
} else {
  new TodoApp();
}