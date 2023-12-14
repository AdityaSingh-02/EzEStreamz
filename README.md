This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### Create a new .env file and copy the content of .sample.env > .env file.

![code](https://github.com/AdityaSingh-02/EzEStreamz/assets/94185167/837e858e-79ed-4c0a-8682-5de6025b739d)

### Create an account in Appwrite and then Create a new empty project for web apps in [Appwrite](https://cloud.appwrite.io/) , get the API key and paste in .env file

<img width="1483" alt="Screenshot 2023-10-05 at 8 06 55 PM" src="https://github.com/AdityaSingh-02/EzEStreamz/assets/94185167/c5c85b34-fe55-4e65-8974-35f83105b716">


### Install all the dependencies and get started with npm run dev, create account and check whether appwrite service is working or not.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

# Contribute

**Hey Folks I would appreciate if anyone wants to contribute to this repo, and make this application even better**

## Repository Structure

- When a user logs in successfully, they get the option to create a room as well as join a room by entering 12 digits unique RID, and by both ways, the user is redirected to /rooms/:rid, in the next js the folder would be named as room/[rid]

- To know more about the folder structure read the nextJs docs. All folder in "(this)" format are usually not accessible if not logged in. Hence in order to access secure content add appwrite service and then login.


<img width="752" alt="Screenshot 2023-09-30 at 10 36 10 PM" src="https://github.com/AdityaSingh-02/EzEStreamz/assets/94185167/065e3a04-a13a-4f25-99b2-5c3b27f70e9e">


## What cooking??

After Implementing video call feature, we aim to add some more things, want to know?? let's have a look 

- Feature -> add friends to friend list
- Feature -> Direct video call and chat option with friends
- Feature -> add secret chat option where users join a room, talk and leave with no history behind.

  
