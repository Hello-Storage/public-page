"use client";

import { GrCircleInformation } from "react-icons/gr";
import { useEffect, useState } from "react";

import axios from "axios";

import Image from "next/image";
import ServerM from './assets/images/Outline/Server_m.png';
import FileUploadM from './assets/images/Outline/File-upload_m.png';
import UserPlusM from "./assets/images/Outline/User-plus_m.png";
import FileM from "./assets/images/Outline/File_m.png";
import ShieldM from "./assets/images/Outline/Shield_m.png";
import HotspotM from "./assets/images/Outline/Hotspot_m.png";
/* import Chart from "./Components/Chart"; */

type IconWithTooltipProps = {
  IconComponent: any; // Esto es para componentes sin props
  tooltipText: string;
};

const IconWithTooltip = ({ IconComponent, tooltipText }: IconWithTooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      style={{ position: "relative" }}
    >
      <IconComponent />
      {showTooltip && (
        <div
          style={{
            position: "absolute",
            top: "-90px", // Hace que el tooltip aparezca 30px más arriba respecto al icono
            right: "5px",
            padding: "15px",
            minWidth: "250px", // Establece un ancho mínimo para el tooltip
            backgroundColor: "white",
            color: "dimgrey",
            borderRadius: "7px",
            zIndex: 100,
          }}
        >
          {tooltipText}
        </div>
      )}
    </div>
  );
};

const Statistics = () => {
  const [upfile, setupfile] = useState("");
  const [msize, setmsize] = useState(0);
  const [encryptedfiles, setencryptedfiles] = useState("");
  const [publicfiles, setpublicfiles] = useState("");
  const [totalusers, settotalusers] = useState("");
  const [totalusedstorage, settotalusedstorage] = useState(0);

  const [loading, setLoading] = useState(true);

  function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Byte';

    const k = 1000;
    const sizes = [' Bytes', ' KiB', ' MiB', ' GiB', ' TiB', ' PiB', ' EiB', ' ZiB', ' YiB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / (k ** i)).toFixed(2)) + sizes[i];
  }

  const fetchData = () => {
    // Esta URL debe ser la ruta de tu backend
    const apiUrl = "https://api-staging.joinhello.app/api/statistics";

    axios
      .get(apiUrl)
      .then((response) => {
        setupfile(response.data.UploadedFile);
        setmsize(response.data.CountMediumSizeFiles);
        settotalusers(response.data.TotalUsers);
        setencryptedfiles(response.data.EncryptedFiles);
        setpublicfiles(response.data.PublicFiles);
        settotalusedstorage(response.data.TotalUsedStorage);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error loading data", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();

    // 15 seconds update interval
    const intervalId = setInterval(fetchData, 15000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="text-black relative h-full" style={{ backgroundColor: "white" }}>
      <div className="text-black flex flex-col md:flex-row justify-center items-center">
        <h1 className="text-xl font-medium text-center mt-10 md:mr-4">
          Hello Storage Overview
        </h1>
        <a
          href="https://staging.joinhello.app/login"
          className="text-sm bg-blue-500 text-white py-1 px-3 rounded mt-4 md:mt-10 md:absolute md:top-3 md:right-4"
        >
          Go to Hello Staging
        </a>
      </div>
      {
        loading && (
          <div className="text-black flex flex-col md:flex-row justify-center items-center">
            <h1 className="text-xl font-medium text-center mt-10 md:mr-4">
              Loading...
            </h1>
          </div>
        )
      }
      <hr className="my-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8 mx-auto max-w-screen-xl">
        <div className="border bg-blue-100 rounded-lg p-2.5 flex flex-col items-center justify-center">
          <Image alt="servericon" src={ServerM} className="mb-2" />
          <div className="flex items-center mb-2">
            <label className="block mr-2">Total Used Storage</label>
            <IconWithTooltip
              IconComponent={GrCircleInformation}
              tooltipText="Total data stored by all users"
            />
          </div>
          <label className="text-1x8 font-semibold text-black block">
            {formatBytes(totalusedstorage)}
          </label>
        </div>

        <div className="border bg-blue-100 rounded-lg p-3 flex flex-col items-center justify-center">
          <Image alt="fileuploadicon"
            src={FileUploadM}
            className="mb-2"
          />
          <div className="flex items-center mb-2">
            <label className="block mr-2 text-black">Files Uploaded</label>
            <IconWithTooltip
              IconComponent={GrCircleInformation}
              tooltipText="The total amount of files uploaded"
            />
          </div>
          <label className="text-1x8 font-semibold text-black block">
            {upfile}
          </label>
        </div>

        <div className="border bg-blue-100 rounded-lg p-3 flex flex-col items-center justify-center">
          <Image alt="userplusicon"
            src={UserPlusM}
            className="mb-2"
          />
          <div className="flex items-center mb-2">
            <label className="block mr-2">Total Users</label>
            <IconWithTooltip
              IconComponent={GrCircleInformation}
              tooltipText="The number of wallet addresses registered"
            />
          </div>
          <label className="text-1x8 font-semibold text-black block">
            {totalusers}
          </label>
        </div>

        <div className="border bg-blue-100 rounded-lg p-3 flex flex-col items-center justify-center">
          <Image alt="filem" src={FileM} className="mb-2" />
          <div className="flex items-center mb-2">
            <label className="block mr-2">Average File Size</label>
            <IconWithTooltip
              IconComponent={GrCircleInformation}
              tooltipText="The total media of the files"
            />
          </div>
          <label className="text-1x8 font-semibold text-black block">
            {formatBytes(msize)}
          </label>
        </div>

        <div className="border bg-blue-100 rounded-lg p-3 flex flex-col items-center justify-center">
          <Image alt="shield" src={ShieldM} className="mb-2" />
          <div className="flex items-center mb-2">
            <label className="block mr-2">Encrypted Files </label>
            <IconWithTooltip
              IconComponent={GrCircleInformation}
              tooltipText="Total secure encrypted files"
            />
          </div>
          <label className="text-1x8 font-semibold text-black block">
            {encryptedfiles}
          </label>
        </div>

        <div className="border bg-blue-100 rounded-lg p-3 flex flex-col items-center justify-center">
          <Image alt="hotspot" src={HotspotM} className="mb-2" />
          <div className="flex items-center mb-2">
            <label className="block mr-2">Public Files</label>
            <IconWithTooltip
              IconComponent={GrCircleInformation}
              tooltipText="The total amount of public files"
            />
          </div>
          <label className="text-1x8 font-semibold text-black block">
            {publicfiles}
          </label>
        </div>
      </div>

      <div className="mt-10 mb-5 flex justify-center">
        <div style={{ width: "70%" }}>
          {" "}
          {/* <Chart /> */}
        </div>
      </div>
      <div className="mt-10 mb-5 flex justify-center">
        <div className="max-w-4xl w-full px-4 md:px-0">
          <h1 className="w-full text-2xl text-center">Welcome to the Hello Decentralized Infrastructure statistics page!</h1>
          <br />
          <p className="text-xl text-justify">
            Here you can find all the important information about our infrastructure. As you can see from the columns above, we have a total of {totalusedstorage} bytes of files stored on our network. Out of these, {encryptedfiles} files are encrypted and {publicfiles} files are public. We take pride in our secure and decentralized infrastructure, and we're constantly working to improve it. Thank you for choosing Hello Decentralized Infrastructure!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
