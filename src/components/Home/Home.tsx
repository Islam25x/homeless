import Main from "./HomeTop/HomeTop";
import ExploreRentals from "./ExploreRentals/ExploreRentals";
import MostRental from "./MostRental/MostRental";
import ManageProperty from "./ManageProperty/ManageProperty";
import MainHeader from "../Headers/MainHeader/MainHeader";
import LandlordHeader from "../Headers/LandlordHeader/LandlordHeader";
import Footer from "../Footer/Footer";
function Home() {
    return (
    <>
        <MainHeader />
        {/* <LandlordHeader /> */}
        <Main />
        <ExploreRentals />
        <MostRental />
        <ManageProperty />
        <Footer />
    </>
    );
}

export default Home;
