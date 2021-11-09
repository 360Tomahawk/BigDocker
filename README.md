# BigDocker

BigDocker aims to implement a big data architecture in a docker image. The docker image will contain components to process a large dataset uploaded by the user and utilise various machine learning algorithms on the dataset to learn about the dataset. It will contain a ui/ux to unify the various software implemented for the project.

We plan to focus on data source, data storage and batch processing as we feel that these three components will help the students understand big data the most. Most of our project focus will be on implementing a docker image where students can easily use machine learning on datasets they download onto our website. They can then use the datasets to filter various columns they wish to view and edit.

Usage Instructions: 
```
1) Install [Docker](https://www.docker.com/)
2) Download our Docker-compose file with any utility, and place it in a folder of your choice
3) Launch a new terminal and navigate to that folder
4) Run docker compose up, this will take a while... (don't close the terminal!)
5) Go to localhost:3000 in your browser
6) When done, issue the CTRL-C command in that same terminal you opened in step 3
7) repeat steps 3-7 for future use!
```
