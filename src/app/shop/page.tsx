import ImgSelect from "@/components/imgselect";
import BlackBar from "@/components/BlackBar";

export default function ShopPage() {
    return (
        <div className="min-h-full pb-[16rem]  relative">
            {/* Header Section */}
            <div className="w-full h-[15rem] bg-cuspinky mt-6 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold">Shop</div>
                <div className="mt-1 text-sm flex items-center">
                    <span className="font-medium">Home</span>
                    <img src="arr.png" alt="arrow" className="mx-2 w-3 h-3" />
                    <span className="text-cusGray">Shop</span>
                </div>
            </div>

            {/* Image Selection Section */}
            <ImgSelect />

            {/* Black Bar Section */}
            <BlackBar />
        </div>
    );
}
