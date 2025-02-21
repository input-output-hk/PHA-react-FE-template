# Front-End Starter Template

This repository is a front-end starter template using [React](https://react.dev/), [Vite](https://vite.dev/), [MUI](https://mui.com/material-ui/?srsltid=AfmBOor8atqstNDKO2OzksylVmtqlECvFemwfAsohhkekSWlAHXt_56b), [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction), and [TypeScript](https://www.typescriptlang.org/). It is designed to help you quickly set up a new project with the best practices and configurations already in place.

## Getting Started

### Usage 
This repository is already set up to connect to the Plutus High Assurance Project Board. To make sure you have this fully set up properly complete the following steps every time you use this template. 

1. Click on the `Use this template` button on the GitHub repository page.
2. Fill in the repository details to create your new project repository.
3. Once instantiated, ensure that you have the following labels in your repository:
    - `epic`
    - `story`
    - `task`
    - `bug`
    - `idea`
    - `to be triaged`

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
    npm run dev
    ```

### Building for Production
When it is time to deploy your app for production, simply run the `vite build` command. By default, it uses <root>/index.html as the build entry point, and produces an application bundle that is suitable to be served over a static hosting service. Visit the [Vite Documentation](https://vite.dev/guide/build.html) to learn more.

### Project Structure

The template is organized as follows:

- **`github`**: Contains a workflow to sync this repo with updates made on parent repo Plutus-High-Assurance-Template.
- **`starter_app`**: The main application directory.
    - **`public`**: Contains public assets like HTML and images.
    - **`src`**: Contains the main source code for the application.
        - **`components`**: Reusable React components.
        - **`store`**: Minimal Zustand store configuration with Typescript type definitions for store variables.
        - **`styles`**: Global styles and theme configuration.
    

### Customization

This template is designed to be easily customizable. Feel free to modify the files and structures to suit your project's needs. The template uses MUI for UI components and theming, it is set up to use TypeScript for type safety and development efficiency, and it is configured to use Zustand for a lightweight global store management solution.

### Contributing

If you have any suggestions or improvements, feel free to open an issue or create a pull request. Contributions are always welcome!

