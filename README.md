# Front-End Starter Template

This repository is a front-end starter template using [Next.js](https://nextjs.org/), [MUI](https://mui.com/material-ui/?srsltid=AfmBOor8atqstNDKO2OzksylVmtqlECvFemwfAsohhkekSWlAHXt_56b), [TypeScript](https://www.typescriptlang.org/), and [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction). It is designed to help you quickly set up a new project with the best practices and configurations already in place.

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

4. First, run the development server:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Project Structure

The template is organized as follows:

- **`github`**: Contains a workflow to sync this repo with updates made on parent repo Plutus-High-Assurance-Template.
- **`starter_app`**: The main application directory.
    - **`public`**: Contains public assets like HTML and images.
    - **`src/app`**: Contains the main source code for the application.
        - **`components`**: Reusable React components.
        - **`store`**: Minimal Zustand store configuration with Typescript type definitions for store variables.
        - **`styles`**: Global styles and theme configuration.
    

### Customization

This template is designed to be easily customizable. Feel free to modify the files and structures to suit your project's needs. The template uses MUI for UI components and theming, it is set up to use TypeScript for type safety and development efficiency, and it is configured to use Zustand for a lightweight global store management solution.

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Contributing

If you have any suggestions or improvements, feel free to open an issue or create a pull request. Contributions are always welcome!

