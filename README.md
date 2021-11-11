# BigDocker

BigDocker aims to implement a big data architecture in a docker image. The docker image will contain components to process a large dataset uploaded by the user and utilise various machine learning algorithms on the dataset to learn about the dataset. It will contain a ui/ux to unify the various software implemented for the project.

We plan to focus on data source, data storage and batch processing as we feel that these three components will help the students understand big data the most. Most of our project focus will be on implementing a docker image where students can easily use machine learning on datasets they download onto our website. They can then use the datasets to filter various columns they wish to view and edit.

Usage Instructions: 
```
1) Install Docker at https://www.docker.com/, we recommend Docker Desktop.
2) Get our Docker-Compose YAML file at https://firebasestorage.googleapis.com/v0/b/bigdocker.appspot.com/o/docker-compose.yml?alt=media&token=6b90756c-e7ea-48ff-8406-5cd8fa2d1dc4, or get it from this repository
3) Move this YAML file to a folder of your choice.
4) Launch a new terminal and navigate to that folder.
5) Run docker compose up 
6) When the terminal instance no-longer updates with new information, the application is ready to be used. Do not kill the terminal instance.
7) Launch the application by going to http://localhost:3000 
8) When done, issue the CTRL-C command in the same terminal you opened in step 4
9) Repeat steps 4-8 for future use.

```
Product video:
[![Video](https://img.youtube.com/vi/7opgy9BYt4Y/maxresdefault.jpg)](https://youtu.be/7opgy9BYt4Y)
