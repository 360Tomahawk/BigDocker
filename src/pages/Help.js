import React, { useEffect } from "react";
import "../App.css";
import "../css/Help.css";
import { scroller } from "react-scroll";
function Help() {
  const scroll = (d) => {
    scroller.scrollTo(d, {
      duration: 1500,
      delay: 0,
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
        linked: true,
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
                <button href="#" value="pandas" onClick={handleClick}>
                  Pandas
                </button>
                <ul>
                  <li>What is Pandas?</li>
                  <li>Pandas Dataframe</li>
                </ul>
              </li>
              <li>
                <button href="#" value="numpy" onClick={handleClick}>
                  Numpy
                </button>
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
                <button href="#" value="matplotlib" onClick={handleClick}>
                  Matplotlib
                </button>
                <ul>
                  <li>What is Matplotlib?</li>
                </ul>
              </li>
              <li>
                <button href="#" value="sklearn" onClick={handleClick}>
                  Sklearn
                </button>
                <ul>
                  <li>What is Sklearn?</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            Data
            <ul>
              <li>Definition</li>
              <li>Domain Understanding</li>
              <li>Exploring a sample Dataset</li>
              <li>Preprocessing</li>
              <li>Visualisation</li>
              <li>Clustering</li>
            </ul>
          </li>
          <li>
            Machine Learning
            <ul>
              <li>Definition</li>
              <li>Classification</li>
              <li>Evaluating Classification Algorithm</li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="content pandas">
        <h1>Introduction</h1>
        <br />
        <br />
        <h2>Pandas</h2>
        <br />
        <div className="subcontent">
          <h3>What is Pandas?</h3>
          <p>
            Pandas is an open source data analysis tool using python programming language.
          </p>
          <br />
          <br />
          <h3>Pandas Dataframe</h3>
          <p>
            A Pandas DataFrame is a 2 dimensional data structure, like a 2
            dimensional array, or a table with rows and columns.
          </p>
        </div>
      </div>
      <div className="content numpy">
        <br />
        <br />
        <br />
        <br />
        <br />
        <h2>NumPy</h2>
        <br />
        <div className="subcontent">
          <h3>What is NumPy?</h3>
          <p>
            NumPy is the fundamental package for scientific computing in Python.
            It is a Python library that provides a multidimensional array
            object, various derived objects (such as masked arrays and
            matrices), and an assortment of routines for fast operations on
            arrays, including mathematical, logical, shape manipulation,
            sorting, selecting, I/O, discrete Fourier transforms, basic linear
            algebra, basic statistical operations, random simulation and much
            more.
          </p>
        </div>
      </div>
      <div className="content matplotlib">
        <br />
        <br />
        <br />
        <br />
        <br />
        <h2>Matplotlib</h2>
        <br />
        <div className="subcontent">
          <h3>What is Matplotlib?</h3>
          <p>
            MatPlotLib is used for the visualization of data in python.
          </p>
        </div>
      </div>
      <div className="content sklearn">
        <br />
        <br />
        <br />
        <br />
        <br />
        <h2>Sklearn</h2>
        <br />
        <div className="subcontent">
          <h3 id="#sklearn">What is Sklearn?</h3>
          <p>
            Scikit-learn(Sklearn) is used for predictive data analysis and is
            accessible for everyone. Sklearn is built on numpy, SciPy and
            matplotlib and mostly used for machine learning algorithms. Sklearn
            provides Classification, Regression, Clustering, Dimensionality
            reduction, Model selection and preprocessing as part of the package.
          </p>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="content definition">
        <h1>Data</h1>
        <br />
        <br />
        <h2>Definition</h2>
        <br />
        <div className="subcontent">
          <p>
            Big Data:
            <br /> Extremely large data sets that may be analysed
            computationally to reveal patterns, trends, and associations,
            especially relating to human behaviour and interactions.
            <br />
            <br /> Data is known as a collection of attributes that describe an
            object.
            <br />
            <br />
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
          </p>
        </div>
        <br/>
        <h2>Exploring a sample Dataset</h2>
        <div className="subcontent">
          <p>
            <br />
            Data Imbalance happens when the distribution of examples
            across the known classes is biased or skewed.
            The distribution can vary from a slight bias to a severe imbalance
            where there is one example in the minority class for hundreds,
            thousands, or millions of examples in the majority class or classes.
            <br />
            <br />
            Class Imbalance happens when the affected attribute is a target variable <br />
            Feature Imbalance happens when the affected attribute is an input variable
          </p>
        </div>
      <h2>Preprocessing</h2>
      <div className="subcontent">
        <p>
          <br />
          One Hot encoding:
          <br />
          <br />
          One-hot encoding converts strings into vectors of bits (0 or 1) and 1 appears once in each vector (thus “one-hot”)<br />
          Check out this code sample: <br /><br />
          <div class="compute">
            <script type="text/x-sage">
              WAITING FOR CODE
            </script>
          </div>
        </p>
      </div>
      <h2>Normalization</h2>
      <div className="subcontent">
        <p>
          <br />
          One Hot encoding:
          <br />
          <br />
          Normalization is the process of organizing data in a database. 
          This includes creating tables and establishing relationships between those tables 
          according to rules designed both to protect the data and to make the database more flexible 
          by eliminating redundancy and inconsistent dependency.<br />
          Check out this code sample: <br /><br />
          <div class="compute">
            <script type="text/x-sage">
              WAITING FOR CODE
            </script>
          </div>
        </p>
      </div>
      </div>



      

      

    </div>
  );
}

export default Help;
