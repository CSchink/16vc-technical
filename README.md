# Team Collaboration App 

Hosted on [Netlify](https://16vc-technical.netlify.app/)

## Basic use cases implemented:

### Collaboration & Web Socket Integration

- Open up the Netlify link in two tabs simultaneously (app does not currently register WebSocket history)
- Add task
- Confirm task appears in both tabs
- Mutate task
- Confirm mutation happens simultaneously in both tabs
- *Currently facing issues with duplicate messages / state when changing a task's status*
  
### Task View:

- List of tasks in a table format with table actions for marking a task as deleted or completed.
- A "new task" icon boldly visible, for adding a new task.
- A progress bar marking the current count of all tasks by status

### Adding a task:

- Click on adding task icon, view a modal with custom input form field for submission.
- Able to assign name, description, category, and status.  Name and category required.
- Basic form validation for required fields.

## Technical implementation

### Implemented using React + TypeScript + Vite, with Github Issues for project mgmt

- Vite for hot reloading, fast development, quick implentation
- TypeScript a must for typeguarding against exceptions and providing a faster and more efficient developer experience
- Jest for unit testing
- Custom logger to capture the necessity of logging to a dedicated storage system
- Hooks to abstract away fetch / data mgmt from the rest of the application
- Session context in order to simulate the need for user-based app responsiveness (permissions, views, etc)
- CI/CD with GitHub Actions and Netlify for integrated testing and deployments
- Mantine for fast, professional styling
- Project planning completed before a single piece of code was written, then documented in Github issues for tracking 

### Thought process

**CI/CD**. Having worked on projects with teams that eschewed CI/CD, I am well aware at how quickly a codebase can become difficurt to manage.
Therefore, having tight version control rulesets enforced through GitHub actions at the foundation of a project is a must.

**Logging**. Logging is critical for a production-grade application. Therefore a custom logger component was created to simulate the logging
of critical details to a dedicated logging DB. In practice I would likely leverage something like an AWS ElasticSearch cluster to
manage high volume logging transactions.

**Abstraction & DRY**.  Abstracting away error handling, data formatting, or form building into dedicated functions and / or components makes the replacement
of libraries / frameworks / external APIs much less painful. Therefore, I implemented a hook for the WebSocket integration, 
custom error handlers and a custom error boundary for the app.  If I had more time I would also implement a form factory in order
to abstract away any sort of input into a dedicated abstraction layer. 

**Code Splitting**.  Implemented code splitting of components through the Loadable framework and React Router. 

**Project MGMT and Design**  Before a single piece of code was written I reviewed all requirements and designed the MVP with usability in mind.  Issues were
then created in order to methodically track the status of the project. From there I set out to complete the MVP and, once finished, tagged it as a [v0.1](https://github.com/CSchink/16vc-technical/releases) release.  
Knowing the limitations with that implementation I then set out on a more interactive version with realtime WebSocket updates. I replaced the Web Socket integration with a more robust version, 
needing only to change some dependencies and update the React hook previously implemented. 
