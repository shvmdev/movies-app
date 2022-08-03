import React from 'react'

const Home = () => {
  return (
    <div>Home</div>
  )
}



  function Banner() { 
  React.useEffect(async function () {
    let response = await fetch(
      "https://api.themoviedb.org/3/trending/all/day?api_key=bbbb453232473dc64d9767525f766396"
    );
    let data = await response.json();
    console.log("data", data);
  }, []);

  return <><h1>Banner</h1></>
}

export { Home,Banner}