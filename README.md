# Receipt Processor Submission For the SDM Role at Fetch

Project Description (provided by Fetch): https://github.com/fetch-rewards/receipt-processor-challenge

## Technical Overview
NodeJS + ExpressJS + TypeScript. Leverages popular libraries UUID and Zod for UUID generation and input validation respectively rather than reinventing the wheel.

For a production-grade application, I would leverage jest for testing, prettier/eslint for formatting and standardization, and dynamoose/mongoose/etc for proper database integration (depending on what database was choosen).

## Local Development
This package can be run locally without Docker using ```npm run dev``` or ```npm run build && npm run start```. Dev leverages ts-node which negates the need to build and compile to JS first, slightly improving development speed.

## Docker Instructions
Navigate to the directory and run ```docker build -t receipt-processor .``` followed by ```docker run -p 3000:3000 receipt-processor```