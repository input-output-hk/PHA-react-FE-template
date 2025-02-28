# Front-End Starter Template

This repository is a front-end starter template using [Create-React-App](https://create-react-app.dev/docs/getting-started/), [MUI](https://mui.com/material-ui/?srsltid=AfmBOor8atqstNDKO2OzksylVmtqlECvFemwfAsohhkekSWlAHXt_56b), and [TypeScript](https://www.typescriptlang.org/). It is designed to help you quickly set up a new project with the best practices and configurations already in place.

## Getting Started

### Running the Application

To get the application running, follow these steps:

1. Clone your newly created repository:
    ```bash
    git clone https://github.com/yourusername/yourrepository.git
    ```

2. Navigate to the `starter_app` folder:
    ```bash
    cd yourrepository/starter_app
    ```

3. Install the necessary packages:
    ```bash
    npm install
    ```

4. Start the application:
    ```bash
    npm run start
    ```

### Project Structure

The template is organized as follows:

- **`starter_app`**: The main application directory.
    - **`public`**: Contains public assets like HTML and images.
    - **`src`**: Contains the main source code for the application.
        - **`components`**: Reusable React components.
        - **`styles`**: Global styles and theme configuration.

### Form Validation 

- HTML attributes (`required`, `pattern`) are used whenever possible to leverage native browser validation.
- Custom validation (`onBlur`) is used for complex cases where **pattern matching (RegEx)** is required.
- Component-Level Validation: Each input component handles its own validation.
- Parent-Level Validation: When multiple fields exist within a form, validation logic is managed at the form level.

### Customization

This template is **fully customizable**. You can:

- Modify the component structure to suit your project’s needs.
- Adjust the MUI theme and global styles to match your design preferences.
- Extend validation logic based on specific project requirements.

### Contributing

If you have any suggestions or improvements, feel free to open an issue or create a pull request. Contributions are always welcome!