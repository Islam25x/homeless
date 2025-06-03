import Main from "./HomeTop/HomeTop";
import ExploreRentals from "./ExploreRentals/ExploreRentals";
import MainHeader from "../Headers/MainHeader/MainHeader";
import LogedHeader from "../Headers/LogedHeader/LogedHeader";
import Footer from "../Footer/Footer";

function Home() {
    const userRole: any = localStorage.getItem('userRole') || ''; 
    console.log(userRole);
    
    return (
        <>
            {userRole === '' ?  <MainHeader />:<LogedHeader /> } 
            <Main />
            <ExploreRentals />
            <Footer />
        </>
    );
}

export default Home;
