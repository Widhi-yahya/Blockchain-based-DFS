# Blockchain Distributed Filesystem v2

This project implements a distributed filesystem based on blockchain technology. It allows users to upload files to a decentralized network of nodes, ensuring data integrity and availability.

## Project Structure

- **src/**: Contains the source code for the application.
  - **blockchain/**: Implements the blockchain logic.
    - `block.ts`: Defines the Block class.
    - `chain.ts`: Manages the chain of blocks.
    - `transaction.ts`: Represents transactions in the blockchain.
  - **network/**: Handles peer-to-peer communication and consensus.
    - `consensus.ts`: Implements the consensus algorithm.
    - `peer.ts`: Manages connections between nodes.
  - **storage/**: Manages file uploads and sharding.
    - `fileManager.ts`: Handles file storage and retrieval.
    - `sharding.ts`: Implements sharding logic for file distribution.
  - **web/**: Contains the web interface for file uploads.
    - **controllers/**: Handles HTTP requests.
      - `fileController.ts`: Manages file-related requests.
    - **routes/**: Defines the web routes.
      - `index.ts`: Sets up the application routes.
    - **public/**: Contains static files.
      - `index.html`: The main HTML page for file uploads.
    - `server.ts`: Initializes the web server.
  - `app.ts`: The main entry point of the application.

- **config/**: Contains configuration files.
  - `default.json`: Default settings for the application.
  - `nodes.json`: Lists participating node IP addresses.

- **scripts/**: Contains deployment and setup scripts.
  - `deploy.sh`: Automates deployment on virtual machines.
  - `setup-node.sh`: Sets up the environment on each node.

- `package.json`: Configuration file for npm dependencies.
- `tsconfig.json`: TypeScript configuration file.
- `README.md`: Documentation for the project.

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd blockchain-fs
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure the nodes in `config/nodes.json`:
   ```json
   {
     "nodes": [
       "172.16.1.12",
       "172.16.1.13"
     ]
   }
   ```

4. Set up the environment on each node:
   ```
   ./scripts/setup-node.sh
   ```

5. Deploy the application:
   ```
   ./scripts/deploy.sh
   ```

6. Start the web server:
   ```
   npm start
   ```

## Usage

- Access the web interface at `http://<your-server-ip>:<port>`.
- Use the provided form to upload files to the distributed filesystem.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.