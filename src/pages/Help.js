import React from "react";
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
                <button href="#" value="matlib" onClick={handleClick}>
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
            Pandas is a Python library used for working with data sets. It has
            functions for analyzing, cleaning, exploring, and manipulating data.
            The name "Pandas" has a reference to both "Panel Data", and "Python
            Data Analysis" and was created by Wes McKinney in 2008. Pandas
            allows us to analyze big data and make conclusions based on
            statistical theories. Pandas can clean messy data sets, and make
            them readable and relevant. Relevant data is very important in data
            science
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
      <div className="content matlib">
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
            Matplotlib is a comprehensive library for creating static, animated,
            and interactive visualizations in Python. Matplotlib makes easy
            things easy and hard things possible. Matplotlib ships with several
            add-on toolkits, including 3D plotting with mplot3d, axes helpers in
            axes_grid1 and axis helpers in axisartist.
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
              <li>Multi valued</li>
              <li>Compound</li>
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
      </div>
    </div>
  );
}

export default Help;
