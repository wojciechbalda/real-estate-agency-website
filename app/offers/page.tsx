import Main from "@/app/components/Main"
import PageTitle from "../components/PageTitle"
import AdvertisementCard from "../components/AdvertisementCard"
import RealEstateSearchForm from "../components/RealEstateSearchForm"
import Pagination from "@/app/components/Pagination"
import { getDistricts, getRealEstates } from "../lib/fetch"

const Page = async ({searchParams}: {searchParams: {[key: string]: undefined | string[] | string}}) => {
    const realEstates = await getRealEstates(searchParams)
    const districtsData = await getDistricts();
    const districts = districtsData.__type?.enumValues?.map(district => district.name) || [];
    const numberOfRealEstates = realEstates.realEstatesConnection.aggregate.count;
    const pages = Math.ceil(numberOfRealEstates / 12);

    return <Main>
        <PageTitle>Offer</PageTitle>
        <RealEstateSearchForm districts={districts} />
        {!realEstates.realEstates.length && <p className="text-center py-4">0 offers</p>}
        {!!realEstates.realEstates.length &&
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 py-4">
            {realEstates.realEstates.map(realEstate => {
            const {districtName, price, realEstateImage: {url, alt}, slug, squareFootage} = realEstate
            return <AdvertisementCard key={slug} altText={(alt || "")} image={url} districtName={districtName} price={price} slug={slug} squareFootage={squareFootage} />})}
        </div>
        }
        <Pagination currentPage={Number(searchParams.page) || 1} pages={pages || 1} />
    </Main>
}

export default Page