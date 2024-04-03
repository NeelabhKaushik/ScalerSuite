"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface cancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: boolean;
  username: string;
  emailAddress: string;
  userId: string;
}

export const CoinfirmModal: React.FC<cancelModalProps> = ({
  isOpen,
  onClose,
  type,
  emailAddress,
  username,
  userId,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const router = useRouter();

  const onemailConfirm = async () => {
    try {
      setLoading(true);
      const updatedData = { userId, email: email };
      if (userId) {
        toast.success("Email updated.");
        await axios.patch(`/api/bookings/${userId}/mail`, updatedData);
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      router.push("/bookings");
      router.refresh();
    }
  };
  const onnameConfirm = async () => {
    const updatedData = { userId, name: name };
    try {
      setLoading(true);
      if (userId) {
        toast.success("Name Updated.");
        await axios.patch(`/api/bookings/${userId}/name`, updatedData);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      router.push("/bookings");
      router.refresh();
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const title = type
    ? "Are you sure to update guest's email address?"
    : "Are you sure to update guest's name?";

  const validateEmail = (email: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleSubmit = () => {
    setIsValidEmail(validateEmail(email));
    if (isValidEmail) {
      console.log("Email is valid");
    } else {
      console.log("Please enter a valid email address");
    }
  };
  return (
    <Modal title={title} description="" isOpen={isOpen} onClose={onClose}>
      <p className="text-sm text-gray-600 mb-2">
        Please enter the updated {type ? "email address" : "name"} of the Guest.
      </p>
      <Input
        disabled={type}
        placeholder={type ? username : "Updated Name of Guest"}
        className="mb-2"
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        disabled={!type}
        placeholder={!type ? emailAddress : "Updated Email of Guest"}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="mb-2"
      />
      {type && email.length > 0 && !validateEmail(email) ? (
        <span className="text-sm text-red-500 mt-2">
          Enter Valid Email address
        </span>
      ) : (
        ""
      )}
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={loading}
          variant="default"
          onClick={type ? onemailConfirm : onnameConfirm}
        >
          Coinfirm
        </Button>
      </div>
    </Modal>
  );
};
