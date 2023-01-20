import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  MdAttachMoney,
  MdCloudUpload,
  MdDelete,
  MdFastfood,
  MdFoodBank,
} from "react-icons/md";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { storage } from "../firebase.config";
import { categories } from "../utils/data";
import { getAllFoodItems, saveItem } from "../utils/firebaseFunctions";
import Loader from "./Loader";

const UploadContainer = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("default");
  const [noti, setNoti] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");

  const [, dispatch] = useStateValue();

  const uploadImage = (e) => {
    const progressBar = document.getElementById("progress-bar");

    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progressBar.style.width = `${progress}%`;
        if (progress === 100) progressBar.style.width = 0;
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
        setNoti(true);
        setAlertStatus("danger");
        setMsg("Error while uploading: Try again 🙇");
        setTimeout(() => {
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setIsLoading(false);
          setNoti(true);
          setMsg("Image uploaded successfully 😊");
          setAlertStatus("success");
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const desertRef = ref(storage, imageAsset);
    deleteObject(desertRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setNoti(true);
      setMsg("Image deleted successfully 😊");
      setAlertStatus("success");
    });
  };

  const saveProduct = () => {
    setIsLoading(true);
    try {
      if (!title || !category || !imageAsset || !calories || !price) {
        setNoti(true);
        setAlertStatus("danger");
        setMsg("Required fields can't be empty");
        setTimeout(() => {
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price,
        };
        saveItem(data);
        setIsLoading(false);
        setNoti(true);
        setMsg("Data uploaded successfully 😊");
        setAlertStatus("success");
        clearDataAfterUpload();

        fetchData();
      }
    } catch (error) {
      console.log(error);
      setNoti(true);
      setAlertStatus("danger");
      setMsg("Error while uploading: Try again 🙇");
      setTimeout(() => {
        setIsLoading(false);
      }, 4000);
    }
  };

  const clearDataAfterUpload = () => {
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
    setCategory("default");
  };

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setNoti(false);
    }, 4000);
    return () => {
      clearTimeout(timeoutId);
    };
  });

  return (
    <div className="w-full min-h-screen flex items-center md:items-start justify-center md:mt-9">
      <div className="w-[90%] md:w-[60%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {noti && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give me a title..."
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>

        <div className="w-full">
          <select
            className="w-full outline-none text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="default" className="bg-white">
              Select Category
            </option>
            {categories.map((category) => (
              <option
                value={category.urlParamName}
                key={category.id}
                className="text-base border-0 outline-none capitalize bg-white text-headingColor"
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg">
          <div className="w-full h-1 fixed bottom-0 flex justify-start">
            <div className="w-0 h-full bg-emerald-400" id="progress-bar"></div>
          </div>

          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadImage"
                      accept="image/*"
                      className="w-0 h-0"
                      onChange={uploadImage}
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      className="w-full h-full object-cover"
                      alt="new product"
                    />
                    <button
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="Calories"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>

        <div className="flex items-center w-full">
          <button
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={saveProduct}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadContainer;
