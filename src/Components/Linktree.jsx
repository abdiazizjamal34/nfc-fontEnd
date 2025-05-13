// src/components/Linktree.jsx
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemPrefix,
  Spinner,
} from "@material-tailwind/react";
import {
  Phone,
  Linkedin,
  Globe,
  Download,
  Facebook,
  Instagram,
  Github,
  Youtube,
  Twitter,
  MapPin,
} from "lucide-react";

import { fetchUserData } from "../services/user"; // ✅ import fetch logic
import { useParams } from "react-router-dom";

// Icon Map
const iconMap = {
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  github: Github,
  youtube: Youtube,
  portfolio: Globe,
  resume: Download,
};

export default function Linktree() {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getData() {
      const data = await fetchUserData(username);
      if (data) {
        setUser(data);
        console.log(data);
      }
    }
    getData();
  }, [username]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#1a237e]">
        <Spinner className="h-24 w-24" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md mx-auto rounded-3xl shadow-2xl overflow-hidden relative">
        <div className="h-40 p-0 relative bg-cover bg-center">
          <img
            src={
              user?.CoverImage && user.CoverImage !== ""
                ? user.CoverImage
                : "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=cover&w=800&q=80"
            }
            alt="Cover"
            className="h-[16rem] w-full  object-cover object-center"
          />
          <div className="absolute inset-0 " />
          <Avatar
            src={
              user?.profileImage && user.profileImage !== ""
                ? user.profileImage
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user?.name || "User"
                  )}&background=1a237e&color=fff&size=128`
            }
            alt="profile"
            size="xxl"
            className="border-4 border-white shadow-lg absolute left-6 -bottom-36 z-10"
          />
        </div>
        <CardBody className="pt-16 pb-6 px-6 text-center h-[60vh] overflow-y-auto mt-12">
          <Typography variant="h4" className="font-bold text-[#1a237e]">
            {user.name}
          </Typography>
          <Typography className="font-semibold text-lg mt-1 text-[#1a237e]">
            {user.title}
          </Typography>
          <Typography className="font-medium text-md mb-4 text-[#1a237e]">
            {user.company}
          </Typography>
          <List className="w-full mt-2">
            <ListItem className="rounded-xl px-4 py-3 flex gap-3 items-center hover:bg-blue-50 mb-2">
              <ListItemPrefix>
                <span className="text-[#1a237e] rounded-full p-2">
                  <Phone size={20} />
                </span>
              </ListItemPrefix>
              <div className="flex flex-col items-start">
                <span className="font-semibold text-[#1a237e]">
                  {user.phone}
                </span>
                <span className="text-xs text-gray-500">Mobile</span>
              </div>
            </ListItem>

            {/* Custom Links */}
            {user.customLinks?.map((link) => {
              const Icon = iconMap[link.label.toLowerCase()] || Globe;
              return (
                <ListItem
                  key={link._id}
                  className="rounded-xl px-4 py-3 flex gap-3 items-center hover:bg-blue-50 mb-2"
                >
                  <ListItemPrefix>
                    <span className="rounded-full p-2">
                      <Icon size={20} className="text-[#1a237e]" />
                    </span>
                  </ListItemPrefix>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#1a237e]"
                  >
                    {link.label}
                  </a>
                </ListItem>
              );
            })}

            {/* Social Links */}
            {Object.entries(user.socialLinks || {}).map(([platform, url]) => {
              const Icon = iconMap[platform.toLowerCase()] || Globe;
              return (
                <ListItem
                  key={platform}
                  className="rounded-xl px-4 py-3 flex gap-3 items-center hover:bg-blue-50 mb-2"
                >
                  <ListItemPrefix>
                    <span className="rounded-full p-2">
                      <Icon size={20} className="text-[#1a237e]" />
                    </span>
                  </ListItemPrefix>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#1a237e] capitalize"
                  >
                    {platform}
                  </a>
                </ListItem>
              );
            })}

            {/* Address */}
            <ListItem className="rounded-xl px-4 py-3 flex gap-3 items-center hover:bg-blue-50 mb-2">
              <ListItemPrefix>
                <span className="rounded-full p-2">
                  <MapPin size={20} className="text-[#1a237e]" />
                </span>
              </ListItemPrefix>
              <span className="font-semibold text-[#1a237e]">
                {user.address}
              </span>
            </ListItem>
          </List>
        </CardBody>
        <CardFooter className="flex justify-center bg-transparent pb-8 pt-0 sticky bottom-0">
          <Button
            size="lg"
            className="bg-[#1a237e] text-white rounded-full px-12 py-4 text-lg font-bold shadow-lg hover:bg-blue-900 transition-all"
            onClick={() => window.open(`tel:${user.phone}`)}
          >
            Save Contact
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
