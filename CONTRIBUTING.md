# Contributing to Modern Todo List

First off, thank you for considering contributing to this project! 🎉

## Code of Conduct

This project follows a simple code of conduct:
- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Keep discussions on topic

## How Can I Contribute?

### Reporting Bugs 🐛

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the behavior
- **Expected behavior**
- **Actual behavior**
- **Screenshots** if applicable
- **Browser and OS** information

Example:
```
**Bug**: Tasks not saving on mobile Safari

**Steps to Reproduce:**
1. Open app on iPhone with Safari
2. Add a task
3. Close browser
4. Reopen app

**Expected:** Task should still be there
**Actual:** Task list is empty

**Environment:** Safari 14.1, iOS 14.5
```

### Suggesting Enhancements 💡

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful**
- **List any alternative solutions** you've considered

### Pull Requests 🔄

1. **Fork** the repository
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**:
   - Follow the existing code style
   - Add comments for complex logic
   - Keep commits atomic and well-described
   
4. **Test your changes**:
   - Test on multiple browsers
   - Check mobile responsiveness
   - Verify localStorage functionality
   
5. **Commit with clear messages**:
   ```bash
   git commit -m "Add: Dark mode toggle feature"
   git commit -m "Fix: LocalStorage quota error handling"
   git commit -m "Update: Improve accessibility for screen readers"
   ```
   
6. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
   
7. **Open a Pull Request** with:
   - Description of changes
   - Related issue number (if any)
   - Screenshots of UI changes
   - Testing notes

## Development Setup

1. Clone your fork:
   ```bash
   git clone https://github.com/your-username/todo-list.git
   cd todo-list
   ```

2. Open `training.html` in your browser or use a local server:
   ```bash
   python -m http.server 8000
   # or
   npx serve
   ```

3. Make changes and test thoroughly

## Code Style Guidelines

### JavaScript
- Use **ES6+** features (classes, arrow functions, const/let)
- Use **meaningful variable names** (camelCase)
- Add **JSDoc comments** for functions
- Keep functions **small and focused**
- Handle **errors gracefully**

Example:
```javascript
/**
 * Adds a new task to the task list
 * @param {string} taskText - The text content of the task
 * @returns {boolean} Success status
 */
addTask(taskText) {
  if (!taskText.trim()) {
    console.error('Task text cannot be empty');
    return false;
  }
  
  // Implementation...
  return true;
}
```

### CSS
- Use **CSS custom properties** for colors
- Follow **BEM naming convention** where appropriate
- Keep selectors **specific but not overly nested**
- Add **comments for sections**
- Ensure **mobile-first** responsive design

Example:
```css
/* === Button Styles === */
.btn-primary {
  background-color: var(--primary-color);
  padding: 12px 24px;
  border-radius: var(--border-radius);
}

.btn-primary:hover {
  background-color: var(--primary-hover);
}
```

### HTML
- Use **semantic HTML5** elements
- Include **ARIA labels** for accessibility
- Keep structure **clean and indented**
- Add **comments for major sections**

## Testing Checklist

Before submitting a PR, verify:

- [ ] Code follows style guidelines
- [ ] Tested on Chrome, Firefox, Safari
- [ ] Tested on mobile devices
- [ ] LocalStorage works correctly
- [ ] No console errors
- [ ] Accessibility features work (keyboard navigation, screen readers)
- [ ] All existing features still work
- [ ] Code is well-commented
- [ ] Commit messages are clear

## Feature Ideas to Contribute

Looking for ideas? Here are features we'd love to see:

### High Priority
- [ ] Dark/Light mode toggle
- [ ] Task categories or tags
- [ ] Due dates for tasks
- [ ] Priority levels (high/medium/low)

### Medium Priority
- [ ] Search/filter by keyword
- [ ] Export tasks to JSON/CSV
- [ ] Import tasks from file
- [ ] Drag and drop reordering
- [ ] Task notes/descriptions

### Nice to Have
- [ ] Keyboard shortcuts panel
- [ ] Multiple task lists
- [ ] Cloud sync (Firebase/Supabase)
- [ ] Task templates
- [ ] Pomodoro timer integration
- [ ] Statistics dashboard

## Questions?

Feel free to open an issue with the label `question` if you have any questions about contributing!

## Recognition

Contributors will be:
- Listed in the README
- Mentioned in release notes
- Appreciated forever! 🙏

Thank you for making this project better! 🚀
