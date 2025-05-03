import Main from "./HomeTop/HomeTop";
import ExploreRentals from "./ExploreRentals/ExploreRentals";
import MostRental from "./MostRental/MostRental";
import ManageProperty from "./ManageProperty/ManageProperty";
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
            <MostRental />
            <ManageProperty />
            <Footer />
        </>
    );
}

export default Home;
