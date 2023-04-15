
import VerticalNav from './verticalNav'
import HorizontalNav from './horizontalNav'


export function Home() {

  const styles = {
    backgroundColor:"#8080801a", 
    height:"100vh",
    width:"100vw"
  };
  
  return (
  <>   
    <div style={styles}>
      <VerticalNav/>
      <HorizontalNav/>
    </div>
  </>
  );
}

export default Home;