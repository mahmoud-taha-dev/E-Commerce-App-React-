import PageTitle from "../../components/PageTitle/PageTitle";
import Products from "../../components/Products/Products";

export const Home = () => {
  return (
    <PageTitle title="Home">
      <div className="d-flex align-items-center flex-column">
        <Products />
      </div>
    </PageTitle>
  );
};
export default Home;
