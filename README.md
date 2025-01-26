# Team Collaboration App 

Hosted on [Netlify](https://16vc-technical.netlify.app/)

## Technical implementation

### Implemented using React + TypeScript + Vite

- Vite for hot reloading, fast development, quick implentation
- TypeScript a must for typeguarding against exceptions and providing a faster and more efficient developer experience
- Jest for unit testing
- Custom logger to capture the necessity of logging to a dedicated storage system
- Hooks to abstract away fetch / data mgmt from the rest of the application
- Session context in order to simulate the need for user-based app responsiveness (permissions, views, etc)
- CI/CD with GitHub Actions and Netlify for integrated testing and deployments
- Mantine for fast, professional styling

### Thought process

**CI/CD**. Having worked on projects with teams that eschewed CI/CD, I am well aware at how quickly things can spiral out of control.
Especially when new developers are brought in and begin making changes.  Therefore, having tight version control rulesets enforced
through GitHub actions is a must.

**Logging**. Logging is critical for a production-grade application. Therefore a custom logger component was created to simulate the logging
of critical details to a dedicated logging DB. In practice I would likely leverage something like an AWS ElasticSearch cluster to
manage high volume logging transactions.

**Abstraction & DRY**.  I personally would like to abstract everything out of the view layer of my React app.  Therefore, any error handling,
formatting, or form building I prefer to have isolated into dedicated functions and / or components.  This makes the replacement
of libraries / frameworks / external APIs much less painful. Therefore, I implemented a hook for the WebSocket integration, 
custom error handlers and a custom error boundary for the app.  If I had more time I would also implement a form factory in order
to abstract away any sort of input into a dedicated abstraction layer.

## Basic use cases implemented:

### Web Socket Integration

- Hook to send, retrieve WebSocket messages

### Task View:

- List of tasks in a table format with table actions for marking a task as deleted or completed.
- A "new task" icon boldly visible, for adding a new task.

### Adding a task:

- Click on adding task icon, view a modal with custom input form field for submission.
- Able to assign name, description, category, with name and category required.
- Basic form validation for required fields.
- Date created field assigned by default.
