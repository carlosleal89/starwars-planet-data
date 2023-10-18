import React from 'react';
import '../styles/Loading.css';

export default function Loading() {
  return (
    <div className="loading-div">
      {/* <h1>Lightsaber Fight Loader</h1>
      <p>A little 100% CSS loader inspired in a Lightsaber fight</p>
      <p className="small">
        Done by
        <a href="https://twitter.com/samvgm">
          @samvgm
        </a>
      </p> */}
      <div id="loader">
        <div className="ls-particles ls-part-1" />
        <div className="ls-particles ls-part-2" />
        <div className="ls-particles ls-part-3" />
        <div className="ls-particles ls-part-4" />
        <div className="ls-particles ls-part-5" />
        <div className="lightsaber ls-left ls-green" />
        <div className="lightsaber ls-right ls-red" />
      </div>
    </div>
  );
}

// creditos ao elemento de loading ao https://codepen.io/samvgm
