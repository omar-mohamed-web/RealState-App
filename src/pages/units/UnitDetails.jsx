import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../utils/api";
import Map2 from "../../assets/Map2.svg";

function UniteDetails() {
  const { id } = useParams();
  const contactPhone = "201247859622";
  const [unit, setUnit] = useState("");
  const [loading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState(0);
  const getUnitDetail = async () => {
    try {
      const response = await api.get(`/unit/${id}`);
      setUnit(response.data?.data ?? response.data);
    } catch (error) {
      console.error("Unable to load unit details:", error);
      setUnit(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUnitDetail();
  }, [id]);


  

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (!unit) {
    return <h1> Unit Not Found</h1>;
  }
  return (
    <div className="mx-10">
      <section className="flex flex-col gap-3">
        <div className="w-full object-cover rounded-lg">
          <img
            src={unit.images?.[isActive] || unit.images?.[0]}
            alt={unit.title_en || "Property"}
            className="w-full h-[562px] object-cover"
          />
        </div>
        <div className=" overflow-hidden cursor-pointer flex justify-around items-center">
          {(unit.images ?? []).map((img, index) => {
            return (
              <div key={img} className="">
                <img
                  src={img}
                  alt="Unit"
                  onClick={() => setIsActive(index)}
                  className="w-68 h-45 object-cover rounded-lg"
                />
              </div>
            );
          })}
        </div>
      </section>
      <section className="flex justify-between my-[69px]">
        <div>
          <p className="font-lato font-bold text-[40px] text-[#8E1616]">
            {unit.title_en}
          </p>
          <div className="flex gap-1">
            <img src={Map2} alt="Location" />
            <p className="font-lato font-medium text-[20px] text-[#847D7D]">
              {unit.location_en || unit.zone || unit.address_en || "Location details available on request"}
            </p>
          </div>
        </div>
        <div>
          <p className="text-[#A18E77] font-lato font-bold text-[40px]">
            {unit.price != null ? Number(unit.price).toLocaleString() : "Price on request"}
          </p>
        </div>
      </section>
      <section>
        <div className="grid grid-cols-1 lg:grid lg:grid-cols-2 mb-[148px]">
          <div>
            <p className="font-lato font-bold text-[#1D1616] text-[26px] mb-[25px]">
              At a glance
            </p>
            <ul className="list-disc list-inside">
              <li className="font-lato text-[26px] text-[#847D7D] pb-7.5">Area: {unit.size ?? "Not specified"} {unit.size != null ? "m²" : ""}</li>
              <li className="font-lato text-[26px] text-[#847D7D] pb-7.5">Bedrooms: {unit.bedrooms ?? "Not specified"}</li>
              <li className="font-lato text-[26px] text-[#847D7D] pb-7.5">Bathrooms: {unit.bathrooms ?? "Not specified"}</li>
              <li className="font-lato text-[26px] text-[#847D7D] pb-7.5">Status: {unit.status ?? "Not specified"}</li>
            </ul>
          </div>
          <div>
            <p className="font-lato font-bold text-[#1D1616] text-[26px] mb-[25px]">
              Overview
            </p>
            <p className="font-lato text-[#847D7D] text-[26px] mb-[62px]">
              {unit.description_en || "Contact our team to learn more about this property and its available features."}
            </p>
            <a href={`https://wa.me/${contactPhone}`} target="_blank" rel="noreferrer" className="inline-flex justify-center items-center w-full max-w-[372px] py-[16.5px] bg-[#02aa02] text-[#EEEEEE] rounded-xl cursor-pointer font-lato font-bold text-[20px] mr-[22px] mb-3">
              Contact via WhatsApp
            </a>
            <a href={`tel:+${contactPhone}`} className="inline-flex justify-center items-center w-full max-w-[372px] py-[16.5px] border border-[#8E1616] text-[#8E1616] rounded-xl font-lato font-bold text-[20px]">
              Call
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UniteDetails;
