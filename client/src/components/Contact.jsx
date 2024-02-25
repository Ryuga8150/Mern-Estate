import Button from "@mui/material/Button";

import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

Contact.propTypes = {
  listing: PropTypes.object,
};
function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  // console.log(landlord);
  const navigate = useNavigate();
  const handleMail = function () {
    // console.log("In handle Mail");
    navigate(
      `mailto:ryuga13.1.4@gmail.com?subject=Regarding ${listing.name}&body=Enter your message here`
    );
  };

  useEffect(
    function () {
      const fetchLandlord = async () => {
        try {
          const res = await fetch(`/api/user/${listing.userRef}`);
          const data = await res.json();
          // console.log(data);
          if (data.status !== "success") {
            // console.log(`Error Fetching Landlord: ${data.message}`);
            // console.log(data.message);
            return;
          }
          setLandlord(data.data.user);
        } catch (err) {
          console.log(err);
        }
      };
      fetchLandlord();
    },
    [listing.userRef]
  );

  return (
    <Button
      variant="container"
      sx={{
        width: "100%",
        bgcolor: "brandColor.main",
        padding: "0.8rem 2rem",
        color: "primary.main",
        fontSize: "1.1rem",
        borderRadius: 2,

        "&:hover": {
          borderColor: "brandColor.main",
          bgcolor: "rgb(0, 102, 255,0.9)",
        },
      }}
      onClick={handleMail}
    >
      Contact Dealer
    </Button>
  );
}

export default Contact;
