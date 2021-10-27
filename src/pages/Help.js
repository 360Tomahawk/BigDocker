import React, { useEffect } from "react";
import "../App.css";
import "../css/Help.css";
import { scroller } from "react-scroll";
function Help() {
  const scroll = (d) => {
    scroller.scrollTo(d, {
      duration: 1500,
      delay: 0,
      offset: -90,
      smooth: "easeInOutQuart",
    });
  };
  const handleClick = (value) => {
    scroll(value.target.value);
  };

  useEffect(() => {
    window.sagecell.makeSagecell({
      inputLocation: "div.compute",
      evalButtonText: "Evaluate",
      hide: ["fullScreen"],
    });
  });
  return (
    <div className="page-content">
      <h1>Table of contents</h1>
      <div className="container">
        <ul>
          <li>
            Introduction
            <ul>
              <li>
                <button href="#" value="#pandas" onClick={handleClick}>Pandas</button>
                <ul>
                  <li>What is Pandas?</li>
                  <li>Pandas Dataframe</li>
                </ul>
              </li>
              <li>
                <button href="#" value="#numpy" onClick={handleClick}>Numpy</button>
                <ul>
                  <li>
                    What is NumPy?
                    <ul>
                      <li>NumPy operation for dataframes</li>
                    </ul>
                  </li>
                  <li>Numpy operation for dataframes</li>
                </ul>
              </li>
              <li>
                <button href="#" value="#matplotlib" onClick={handleClick}>Matplotlib</button>
                <ul>
                  <li>What is Matplotlib?</li>
                </ul>
              </li>
              <li>
                <button href="#" value="#sklearn" onClick={handleClick}>Sklearn</button>
                <ul>
                  <li>What is Sklearn?</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            Data
            <ul>
              <li><button href="#" value="#data_definition" onClick={handleClick}>Definition</button></li>
              <li><button href="#" value="#data_domain" onClick={handleClick}>Domain Understanding</button></li>
              <li><button href="#" value="#data_exploring" onClick={handleClick}>Exploring a sample Dataset</button></li>
              <li><button href="#" value="#data_preprocess" onClick={handleClick}>Preprocessing</button></li>
              <li><button href="#" value="#data_visualisation" onClick={handleClick}>Visualisation</button></li>
              <li><button href="#" value="#data_cluster" onClick={handleClick}>Clustering</button></li>
            </ul>
          </li>
          <li>
            Machine Learning
            <ul>
              <li><button href="#" value="#ml_definition" onClick={handleClick}>Definition</button></li>
              <li><button href="#" value="#ml_classification" onClick={handleClick}>Classification</button></li>
              <li><button href="#" value="#ml_ANN" onClick={handleClick}>Artificial Neural Networks</button></li>
              <li><button href="#" value="#ml_ECA" onClick={handleClick}>Evaluating Classification Algorithms</button></li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="content">
        <h1>Introduction</h1>
        <br />
        <h2 id="#pandas">Pandas</h2>
        <br />
        <div className="subcontent">
          <h3>What is Pandas?</h3>
          <span>
            Pandas is an open source data analysis tool using python programming language.
          </span>
          <br />
          <h3>Pandas Dataframe</h3>
          <span>
            A Pandas DataFrame is a 2 dimensional data structure, like a 2
            dimensional array, or a table with rows and columns.
          </span>
        </div>
      </div>
      <div className="content">
        <br />
        <h2 id="#numpy">NumPy</h2>
        <br />
        <div className="subcontent">
          <h3>What is NumPy?</h3>
          <span>
            NumPy is the fundamental package for scientific computing in Python.
            It is a Python library that provides a multidimensional array
            object, various derived objects (such as masked arrays and
            matrices), and an assortment of routines for fast operations on
            arrays, including mathematical, logical, shape manipulation,
            sorting, selecting, I/O, discrete Fourier transforms, basic linear
            algebra, basic statistical operations, random simulation and much
            more.
          </span>
        </div>
      </div>
      <div className="content">
        <br />
        <h2 id="#matplotlib">Matplotlib</h2>
        <br />
        <div className="subcontent">
          <h3>What is Matplotlib?</h3>
          <span>
            MatPlotLib is a library used for creating visualizations of data. <br />
            It can be used to create common diagrams like barchart, pie chart, scatterplot and many others.
            <br />
            Here is a
            <a href="https://matplotlib.org/stable/gallery/index.html" target="_blank" rel="noreferrer"> <u>link</u> </a>
            showcasing the different types of visualizations it is able to create. <br />
          </span>
        </div>
      </div>
      <div className="content">
        <br />
        <h2 id="#sklearn">Sklearn</h2>
        <br />
        <div className="subcontent">
          <h3>What is Sklearn?</h3>
          <span>
            Scikit-learn(Sklearn) is used for predictive data analysis and is
            accessible for everyone. Sklearn is built on numpy, SciPy and
            matplotlib and mostly used for machine learning algorithms. Sklearn
            provides Classification, Regression, Clustering, Dimensionality
            reduction, Model selection and preprocessing as part of the package.
          </span>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="content">
        <h1>Data</h1>
        <br />
        <h2 id='#data_definition'>Definition</h2>
        <br />
        <div className="subcontent">
          <h3>Big Data:</h3>
          <span>
            Extremely large data sets that may be analysed
            computationally to reveal patterns, trends, and associations,
            especially relating to human behaviour and interactions.
            Data is known as a collection of attributes that describe an object.
            <br /><br />
            Dimensions can be:
            <ul className="shiftRight">
              <li>
                Fixed (all objects have the same number of attributes i.e.
                day-by-day weather observations)
              </li>
              <li>Variable (i.e. shopping basket)</li>
              <li>Continuous (i.e. data sequences)</li>
            </ul>
            <br />
            Attributes can be distinguished by type:
            <ul className="shiftRight">
              <li>
                Numeric (i.e. Discrete, continuous, binary, categorical,
                Fractional, Ratio, complex, …)
              </li>
              <li> Symbolic (i.e. textual, symbols,…)</li>
              <li>Single valued</li>
              <li>Multi valued, compound</li>
            </ul>
            <br />
            Typical means of Data Collection:
            <ul className="shiftRight">
              <li>Phone surveys</li>
              <li>Online Surveys</li>
              <li>In-person Interviews</li>
            </ul>
          </span>
        </div>
        {/* DOMAIN UNDERSTANDING */}
        <br />
        <h2 id='#data_domain'>Domain Understanding</h2>
        <br />
        <div className="subcontent">
          <span>
            Knowledge about the environment of the data and the understanding of the
            environment to which results are to be applied to. <br /><br />
            Domain understanding helps to understand the meaning and property of the data. <br />
            It is usually acquired from:<br />
            <ul className="shiftRight">
              <li>Domain experts</li>
              <li>Through research and familiarization</li>
              <li>Data exploration and pre-processing</li>
            </ul>
          </span>
        </div>
        {/* EXPLORING */}
        <br />
        <h2 id='#data_exploring'>Exploring a sample Dataset</h2>
        <br />
        <div className="subcontent">
          <h3>Data Imbalance:</h3>
          <span>
            Data Imbalance happens when the distribution of examples
            across the known classes is biased or skewed.
            The distribution can vary from a slight bias to a severe imbalance
            where there is one example in the minority class for hundreds,
            thousands, or millions of examples in the majority class or classes.
            <br /><br />
            Class Imbalance happens when the affected attribute is a <u>target variable</u>. <br />
            Feature Imbalance happens when the affected attribute is an <u>input variable</u>.
          </span>
        </div>
        {/* PREPROCESSING */}
        <br />
        <h2 id='#data_preprocess'>Preprocessing</h2>
        <div className="subcontent">
          {/* ONE HOT */}
          <br />
          <h3>One Hot encoding:</h3>
          <span>
            One-hot encoding converts strings into vectors of bits (0 or 1) and 1 appears once in each vector (thus “one-hot”)<br />
            Check out this code sample: <br /><br />
            <div className="compute">
              <script type="text/x-sage">
                from sklearn.preprocessing import OneHotEncoder
                encode = OneHotEncoder(handle_unknown='ignore')
                X = [ ['Male', 1], 
                      ['Female', 3], 
                      ['Female', 2]]
                encode.fit(X)
                print(encode.categories_)
                print(encode.transform([['Female', 1], ['Male', 4]]).toarray())
                print(encode.inverse_transform([[0, 1, 1, 0, 0], [0, 0, 0, 1, 0]]))
                print(encode.get_feature_names_out(['gender', 'group']))
              </script>
            </div>
          </span>
          {/* NORMALISE */}
          <br />
          <h3>Normalization:</h3>
          <span>
            Normalization is the process of organizing data in a database. <br />
            This includes creating tables and establishing relationships between those tables
            according to rules designed both to protect the data and to make the database more flexible
            by eliminating redundancy and inconsistent dependency.<br />
            Check out this code sample: <br /><br />
            <div className="compute">
              <script type="text/x-sage">
                X = [ [ 1., -1.,  2.],
                      [ 2.,  0.,  0.],
                      [ 0.,  1., -1.]]
                X_normalized = preprocessing.normalize(X, norm='l2')
                print(X_normalized)
              </script>
            </div>
          </span>
          {/* SCALING */}
          <br />
          <h3>Scaling:</h3>
          <span>
            Scaling is a form of normalization and is used to standardize the range of independent variables.<br /> <br />
            While normalization can be applied to a set of attributes, scaling is applied to each attribute independently<br />
            Check out this code sample: <br /><br />
            <div className="compute">
              <script type="text/x-sage">
                from sklearn import preprocessing
                import numpy as np
                X_train = np.array([[ 1., -1.,  2.],
                                    [ 2.,  0.,  0.],
                                    [ 0.,  1., -1.]])
                scaler = preprocessing.StandardScaler().fit(X_train)
                print(scaler)
                print(scaler.mean_)
                print(scaler.scale_)
                X_scaled = scaler.transform(X_train)
                print(X_scaled)
              </script>
            </div>
          </span>
          {/* FILTERING */}
          <br />
          <h3>Filtering:</h3>
          <span>
            Used to Subset the dataframe rows or columns according to the specified index labels<br />
            Check out this code sample: <br /><br />
            <div className="compute">
              <script type="text/x-sage">
                import pandas as pd
                df = pd.DataFrame(np.array(([1, 2, 3], [4, 5, 6])),
                                  index=['mouse', 'rabbit'],
                                  columns=['one', 'two', 'three'])
              </script>
            </div>
          </span>
        </div>
      {/* Visualisation */}
      <br />
        <h2 id='#data_visualisation'>Visualisation</h2>
        <div className="subcontent">
          {/* BAR GRAPH */}
          <br />
          <h3>Bar Graph:</h3>
          <span>
            A basic bar graph plot example code would be: <br /><br />
            <div className="compute">
              <script type="text/x-sage">
                import pandas as pd
                {/* df = pd.DataFrame({'lab':['A', 'B', 'C'], 'val':[10, 30, 20]}) */}
                bargraph = df.plot.bar(x='lab', y='val', rot=0)
              </script>
            </div>
          </span>
          {/* PIE CHART */}
          <br />
          <h3>Pie Chart:</h3>
          <span>
            A basic pie chart plot example code would be : <br /><br />
            <div className="compute">
              <script type="text/x-sage">
                {/* df = pd.DataFrame({ 'mass': [0.330, 4.87 , 5.97],
                                    'radius': [2439.7, 6051.8, 6378.1]},
                                    index=['Mercury', 'Venus', 'Earth']) */}
                piechart = df.plot.pie(y='mass', figsize=(5, 5))
              </script>
            </div>
          </span>
          {/* LINE CHART */}
          <br />
          <h3>Line Chart:</h3>
          <span>
            A basic line plot example code would be: <br /><br />
            <div className="compute">
              <script type="text/x-sage">
                import pandas as pd
                linechart = pd.Series([1, 3, 2])
                linechart.plot.line()
              </script>
            </div>
          </span>
          {/* SCATTERPLOT */}
          <br />
          <h3>Scatterplot:</h3>
          <span>
            A basic scatterplot example code would be: <br /><br />
            <div className="compute">
              <script type="text/x-sage">
                import pandas as pd
                df = pd.DataFrame([ [5.1, 3.5, 0], 
                                    [4.9, 3.0, 0], 
                                    [7.0, 3.2, 1], 
                                    [6.4, 3.2, 1], 
                                    [5.9, 3.0, 2]], 
                                  columns=['length', 'width','species'])
                scatterplot = df.plot.scatter(x = 'length',y = 'width',c = 'DarkBlue')
              </script>
            </div>
          </span>
          {/* BOX AND WHISKER */}
          <br />
          <h3>Box and Whisker:</h3>
          <span>
            A basic Box and Whisker plot example code would be: <br /><br />
            <div className="compute">
              <script type="text/x-sage">
                import pandas as pd
                df = pd.DataFrame([ [55, 45, 30], 
                                    [80, 90, 70], 
                                    [53, 22, 10], 
                                    [99, 99, 99], 
                                    [70, 79, 69]], 
                                  columns=['Test A', 'Test B','Test C'])
                boxplot = df.boxplot(column=['Test A', 'Test B','Test C'])
              </script>
            </div>
          </span>
        </div>
        {/* CLUSTER ANALYSIS */}
      <br />
        <h2 id='#data_cluster'>Cluster Analysis</h2>
        <div className="subcontent">
          {/* DEFINITION */}
          <br />
          <h3>Definition:</h3>
          <br />
          <span>
            Cluster Analysis aims to subdivide samples into groups (clusters) 
            so that samples in the same cluster share similarities and that samples in different clusters are not similar. 
            It's mainly used to explore data and find similarities and group them together, 
            deriving information from the clustered data.
          </span>
          <br /><br />
          {/* TYPES OF CLUSTER AND CLUSTERING METHODS */}
          <br />
          <h3>Types of cluster and clustering methods:</h3>
          <br />
          <span>
            <li>Partitional Clustering</li>
            <li>Hierarchical Clustering</li>
            <li>K-means
              <ul className="shiftRight">
                <li>Is a machine learning algorithm</li>
                <li>Partitional clustering approach</li>
                <li>Each cluster is associated with a centroid (also called prototype,codebook)</li>
                <li>Each point is assigned to the cluster with the closest centroid</li>
                <li>Number of clusters, K, must be specified</li>
                <li>The basic algorithm is very simple</li>
              </ul>
            </li>
            <li>Self-Organizing Maps
              <ul className="shiftRight">
                <li>A very famous unsupervised machine learning method.</li>
                <li>Perform a topology preserving feature mapping.</li>
                <li>A neural network popularly used for cluster analysis, dimension reduction, and visualization (of high dimensional data).</li>
                <li>The SOM algorithm is neurobiologically inspired, incorporating all the mechanisms that are basic to self organization: competition, cooperation, and self amplification.</li>
                <li>The Kohonen’s SOM algorithm is very simple to implement, yet mathematically it is very difficult to analyze its properties in a general setting.</li>
              </ul>
            </li>
            <li>Hierarchical Clustering
              <ul className="shiftRight">
                <li>Hierarchical Clustering produces a set of nested clusters organized as a hierarchical tree. 
                  It can be visualized as a dendrogram – A tree-like diagram that records the sequences of merges or splits</li>
                <li>It does not have to assume any particular number of clusters 
                  and will get the desired cluster number by cutting the dendrogram at its appropriate level.</li>
                <li>There are two main types of hierarchical clustering:</li>
                <ul>
                  <li>Agglomerative: Starting with the data points as individual clusters 
                    and then slowly merge with clusters until only the desired number of clusters left.</li>
                  <li>Divisive: Starting with one cluster that includes all data points, 
                    it will slowly divide itself until it reaches the desired number of clusters left.</li>
                </ul>
              </ul>
            </li>
            <li>Density Based Clustering</li>
            <li>Cluster Validation
              <ul className="shiftRight">
                <li>Cluster Validation is used:</li>
                <ul>
                  <li>To avoid finding patterns in noise</li>
                  <li>To compare clustering algorithms</li>
                  <li>To compare two sets of clusters</li>
                  <li>To compare two clusters</li>
                </ul>
              </ul>
            </li>
          </span>
        </div>
      </div>
      <div className="content">
        <h1>Machine Learning</h1>
        <br />
        <h2 id='#ml_definition'>Definition</h2>
        <br />
        <div className="subcontent">
          <span>Machine Learning is a computer science concerned with the development of algorithms 
            that can make accurate predictions when given a dataset to learn from.<br/>
            There are generally three types of machine learning:
            <ul className="shiftRight">
              <li>Supervised Learning: The computer is presented with a set of inputs and their  expected outputs. 
                The goal of this approach is to learn the ways it matches the input to the output. 
                One example is deriving the house price from the number of rooms, 
                location of the house and the size of the house.</li>
              <li>Unsupervised Learning: The computer attempts to learn from solely the inputs, 
                finding similarities or patterns in its input and derive information from it. 
                It clusters data into its respective sets and from it gives you an output of the clustered data. 
                One example is identifying what someone will usually purchase together with a product.</li>
              <li>Reinforcement Learning: The computer executes actions in regards to its environment 
                and derives information from the rewards or errors from it. 
                It differs from supervised learning in that the computer does not start off with a set of data inputs. 
                One example is a computer learning how to play chess against a human opponent.</li>
            </ul>
          </span>
        </div>
        <br />
        <h2 id='#ml_classification'>Classification</h2>
        <br />
        <div className="subcontent">
          <span>
          <h3>Definition</h3>
            Classification in machine learning is a process that attempts to predict the class of the data given a set of data inputs. 
            The class of the data is also commonly known as target, label, categories or output. 
            Classification falls under supervised learning. 
            A simple example of classification is judging whether an email is spam or not spam.
          </span>
        </div>
        <br />
        <div className="subcontent">
          <span>
          <h3>Decision Tree</h3>
          Decision Trees is one of the Supervised Learning approaches for Machine Learning. 
          It creates a tree-like flowchart to determine the output from some data input. 
          <br/><br/>
          Some advantages of using a Decision Tree are: 
          <ul className="shiftRight">
            <li>Easy to understand and interpret.</li>
            <li>Easy to utilise with little preprocessing on a dataset.</li>
            <li>Is able to handle categorical or numerical data inputs</li>
            <li>Able to output multiple values</li>
            <li>Able to show how it derives its resultant tree from the training set.</li>
          </ul>
          Some disadvantages of using a Decision Tree are: 
          <ul className="shiftRight">
            <li>Prone to overfitting. 
              Have to prune the tree or set a minimum number 
              of samples to determine a node in a Decision Tree to avoid this problem.</li>
            <li>Small variations of the training set can result in large differences in the resultant Decision Tree.</li>
            <li>Decision Tree can create biased trees due to class imbalance.</li>
          </ul>
          </span>
        </div>
        <br />
        <div className="subcontent">
          <span>
            <h3>K-Nearest Neighbour</h3>
            K-Nearest Neighbour Classification is a Supervised Learning approach to Machine Learning. 
            It assumes that classes for data input are similar to each other. 
            K in this algorithm means the number of closest neighbours the data input must be compared to to arrive at a conclusion. 
            K must be an odd number so that there won't be a tie to vote for the closest label. <br/>
            <br/>
            By clustering training data by their class together, 
            it will then predict the class of a new test data by finding the 
            closest match to the new test data by computing the distance between the data to a cluster. <br/>
            <br/>
            Advantages:
            <ul className="shiftRight">
              <li>It is able to adapt to new training data.</li>
              <li>Variety of ways to measure the distance between data points to suit the specific application.</li>
            </ul>
            <br/>
            Disadvantages:
            <ul className="shiftRight">
              <li>Computational complexity increases the larger the training data is.</li>
              <li>Poor result due to class imbalance. 
                If the training set consists mostly of a single class, 
                it's very likely the model will predict it.</li>
              <li>If the optimal value of K is not chosen, the model might overfit or underfit to a dataset.</li>
            </ul>
            <br/>
          </span>
        </div>
        <div className="subcontent">
          <span>
            <h3>Naives Bayes</h3>
            The Naives Bayes Classifiers is a Supervised Learning classifier 
            based on an implausible assumption of conditional independence between attributes. 
            In simpler terms, it means each feature cannot relate to any other feature and all features 
            make an equal contribution to the outcome. For example, knowing the value of the “Temperature” 
            feature cannot tell you the value of the “Humidity” feature. It is based on the Bayes Theorem hence the name. 
            There are multiple algorithms that are based on this theorem, Multinomial Naive Bayes and Bernoulli Naive Bayes. <br/>
            <br/>
            Advantages:
            <ul className="shiftRight">
              <li>Fast training and classification.</li>
              <li>Can make valid predictions even if some elements of x are missing.</li>
              <li>Very suitable for categorical inputs rather than numerical inputs.</li>
            </ul>
            <br/>
            Disadvantages:
            <ul className="shiftRight">
              <li>Can behave very poorly if the predictors are strongly dependent on each other.</li>
              <li>Estimations can be wrong</li>
              <li>Might end up assigning zero probability to a categorical variable 
                whose category in the test data set wasn’t available in the training dataset.</li>
            </ul>
            <br/>
          </span>
        </div>
        <div className="subcontent">
          <span>
            <h3>Support Vector Machine</h3>
            Support vector machines are a set of Supervised Learning methods used for classification, 
            regression and outlier detection. The objective of this method is to find the best 
            way to separate the data in their respective label. <br/>
            <br/>
            Advantages:
            <ul className="shiftRight">
              <li>Useful for high dimensional spaces.</li>
              <li>Uses a subset of training points in the decision function (called support vectors), so it is also memory efficient.</li>
              <li>Versatile as different kernel functions can be specified for the decision function.</li>
            </ul>
            <br/>
            Disadvantages:
            <ul className="shiftRight">
              <li>Not suitable for large datasets.</li>
              <li>Does not perform well if the dataset has overlapping classes or outliers.</li>
              <li>Might have an issue when the number of features selected exceed the number of training data and thus overfit.</li>
            </ul>
            <br/>
          </span>
        </div>
        <div className="subcontent">
          <span>
            <h3>Logistic Regression</h3>
            Logistic Regression is a Supervised Learning approach to predicting the probability of an output from two variables. 
            It is used to explain the relationship between two variables. <br/>
            <br/>
            There are three types of Logistic Regression:
            <ul className="shiftRight">
              <li>Binary: target variable have two types, 0 or 1, yes or no.</li>
              <li>Multinomial: target variables have three or more types and are not quantitatively significant. 
                Examples are “target A” or “target B” or “target C”</li>
              <li>Ordinal: target variable target variable have three or more types and are ordered. 
                Examples are “poor” or “average” or “good”.</li>
            </ul>
            <br/>
            The output of the Logistic Regression model is categorical in nature.
            <br/>
          </span>
        </div>
        <br />
        <h2 id='#ml_ANN'>Artificial Neural Networks</h2>
        <br />
        <div className="subcontent">
          <span>
            <h3>Definition</h3>
            <li>Learn from data.</li>
            <li>Simulate biological counterpart (the brain).</li>
            <li>Are massively parallel systems.</li>
            <li>Tolerant to faults (within the system) and noise.</li>
            <li>NN consist of Neurons and Axons, and Synapses.</li>
            <li>ANN consist of simulated Neurons and Weights.</li>
          </span>
        </div>
        <br />
        <h2 id='#ml_ECA'>Evaluating Algorithms</h2>
        <br />
        <div className="subcontent">
          <span>
            <h3>Cross Validation</h3>
            Definition: A method used to validate the accuracy of the machine learning model 
            to predict new data by separating a dataset into a training set and a testing set. 
            The training set will be used to train the machine learning model while 
            the testing set is used on the model to test its accuracy. 
            The full dataset will be separated into k numbers of folds(subsets).
            <br/>
            <li>For each subset, the model will be built on k-1 folds on the subset, 
              then the model will be tested on for effectiveness.</li>
            <li>Repeat this until each of the k folds serves as the test set.</li>
            <li>The average accuracy of all the tests will serve as the performance result of the model.</li>
          </span>
          <br/>
          <span>
            <h3>ROC Curve</h3>
            Definition: An ROC curve (Receiver Operating Characteristic curve) is 
            a graph that plots the performance of a classification model for all classification thresholds. 
            The two parameters used for plotting are:
            <br/>

            <li>True Positive Rate (TPR) where TPR = True Positive / (True Positive+False Negative)</li>
            <li>False Positive Rate (FPR) where FPR = False Positive / (False Positive+True Negative)</li>
            <br/>
            AUC (Area under the ROC Curve) provides a measure of performance across the classification thresholds. 
            An AUC of 1.0 means it's a perfect test while an AUC of 0.0 means it's a failed model. 
            Generally, an AUC of above 0.8 is desirable.
            <br/><br/>
            ROC curves are not good for evaluating models where the result of 
            mispredicting data comes at a great cost. For example, it's more desirable 
            for a model to have a higher rate of false positives for cancer detection than a 
            false negative as a false negative could be life threatening while a false positive 
            could just mean taking another test for confirmation.
          </span>
          <br/><br/>
          <span>
            <h3>Mean Squared Error</h3>
            Definition: Mean Squared Error measures the average squared difference between the 
            regression line and true value. The lower the MSE, the better the model is able 
            to predict a set of data from an input. This method of model evaluation is very sensitive to outliers from the data. 
            Performance of a regression task can be evaluated by looking at the prediction error.
          </span>
        </div>
      </div>
      <h1>END OF CONTENT</h1>
    </div>
  );
}

export default Help;
