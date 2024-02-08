import PropTypes from "prop-types";
import { Box, IconButton, ImageListItem, Paper } from "@mui/material";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

// Import Swiper styles
import "swiper/css";
import styled from "@emotion/styled";

ImageSlider.propTypes = {
  imgArr: PropTypes.array,
};

const Image = styled("img")({
  width: "100%",
  height: "32rem",
  backgroundSize: "cover",
  borderRadius: 16,
});

const CustomSwiperSlide = styled(SwiperSlide)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const CustomSwiper = styled(Swiper)({
  position: "relative",
});

const SliderButton = ({ icon, next = false }) => {
  const swiper = useSwiper();
  const Icon = icon;
  // console.log(swiper);
  return (
    <IconButton
      sx={{
        position: "absolute",
        zIndex: 999,
        top: "50%",
        left: !next ? "2%" : null,
        right: next ? "2%" : null,
        bgcolor: "#ffffff73",
        width: 64,
        height: 64,
        "&.MuiIconButton-root:hover": {
          bgcolor: "rgba(255, 255, 255, 0.551)",
        },
      }}
      onClick={next ? () => swiper.slideNext() : () => swiper.slidePrev()}
    >
      <Icon
        sx={{
          bgcolor: "#fff",
          color: "brandColor.main",
          width: 36,
          height: 36,
          borderRadius: "50%",
        }}
      />
    </IconButton>
  );
};
SliderButton.propTypes = {
  icon: PropTypes.any,
  next: PropTypes.bool,
};

function ImageSlider({ imgArr }) {
  const swiper = useSwiper();
  // console.log(swiper);
  return (
    <Paper
      sx={{
        padding: "2rem 2rem",
        borderRadius: 5,
        mb: 5,
      }}
      elevation={9}
    >
      <CustomSwiper
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {imgArr.map((image, ind) => {
          return (
            <CustomSwiperSlide key={ind}>
              <SliderButton icon={ChevronLeftIcon} />
              <Image src={image} alt="burger" loading="lazy" />
              <SliderButton next={true} icon={ChevronRightIcon} />
            </CustomSwiperSlide>
          );
        })}
      </CustomSwiper>
    </Paper>
  );
}

export default ImageSlider;
