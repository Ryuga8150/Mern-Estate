import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "@emotion/styled";
import FilterListIcon from "@mui/icons-material/FilterList";

import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
// #150E15
// #BABBBE
const StyledAccordionSummary = styled(AccordionSummary)((props) => {
  // console.log(props);
  return {
    [props.theme.breakpoints.up("md")]: {
      fontSize: "1.05rem",
    },
    fontWeight: 500,
    fontFamily: "Roboto,Helvetica,Arial,sans-serif",
    minHeight: 12,
    height: 40,
    "&.Mui-expanded": { minHeight: 12, height: 42 },
    padding: 0,
  };
});
const StyledExpandMoreIcon = styled(ExpandMoreIcon)((props) => {
  // console.log(props);
  return {
    width: "1.05em",
    height: "1.05em",
    color: props.theme.palette.brandColor.main,
  };
});
const StyledAccordion = styled(Accordion)({
  "&.Mui-expanded:before": { display: "block !important", opacity: 1 },
  "&.Mui-expanded": { margin: 0 },
});
const StyledAccordionDetails = styled(AccordionDetails)({
  padding: "0 0 0.5rem 0",
});

const syncObject = function (arr) {
  const obj = {};
  arr.forEach((field) => {
    obj[field] = true;
  });

  return obj;
};
function SearchFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { register, handleSubmit, reset } = useForm();

  const [type, setType] = useState("rentAndsale");
  const [benefits, setBenefits] = useState({
    airport: false,
    bus: false,
    metro: false,
    hospital: false,
    cityGarden: false,
    shoppingCentres: false,
  });
  const [facilities, setFacilities] = useState({
    openFloorPlan: false,
    water: false,
    electricity: false,
    parking: false,
    kitchen: false,
    externalLighting: false,
  });
  const [discounts, setDiscounts] = useState({
    moreThanOrEqualTo50: false,
    moreThanOrEqualTo40: false,
    moreThanOrEqualTo30: false,
    moreThanOrEqualTo20: false,
    moreThanOrEqualTo10: false,
    lessThanOrEqualTo10: false,
  });

  const onSubmit = function ({ min, max }) {
    const price = `[${+min},${+max}]`;
    console.log(price);
    searchParams.set("price", price);
    setSearchParams(searchParams);
  };
  const onError = function (err) {
    console.log(err);
  };

  // console.log(searchParams.getAll("benefits"));

  // syncing defaults
  // useEffect(
  //   function () {
  //     setSearchParams((searchParams) => {
  //       const urlType = searchParams.get("type");
  //       if (!urlType) searchParams.set("type", type);
  //       else setType(urlType);
  //       return searchParams;
  //     });
  //   },
  //   [setSearchParams, type]
  // );

  // syncing url

  useEffect(
    function () {
      // console.log("URL PArams in sync");
      const urlBenefits = searchParams.getAll("benefits");
      const urlFacilities = searchParams.getAll("facilities");
      const urlDiscounts = searchParams.getAll("discount");
      const urlType = searchParams.get("type");
      const urlPrice = searchParams.get("price");

      // console.log(urlBenefits);
      setBenefits((benefits) => {
        return { ...benefits, ...syncObject(urlBenefits) };
      });

      // console.log(urlFacilities);
      setFacilities((facilities) => {
        return { ...facilities, ...syncObject(urlFacilities) };
      });

      // similaryly for discount
      // console.log(urlDiscounts);
      setDiscounts((discounts) => {
        return { ...discounts, ...syncObject(urlDiscounts) };
      });

      const urlPriceArray = JSON.parse(urlPrice);
      if (urlPriceArray && urlPriceArray.length > 0)
        reset({ min: urlPriceArray[0], max: urlPriceArray[1] });

      // console.log(urlType);
      if (urlType) setType(urlType);
    },
    [searchParams, reset]
  );
  return (
    <Box
      sx={{
        padding: "0.2rem 0.8rem 0.6rem 0.8rem",
        height: "100%",
        overflowY: "scroll",
        backgroundColor: "#fff",
      }}
    >
      {/* <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <FormControlLabel
          value="rent&sale"
          control={
            <Radio
              sx={{
                color: "brandColor.main",
                "&.Mui-checked": { color: "brandColor.main" },
              }}
            />
          }
          label="Rent And Sale"
        />
        <FormControlLabel
          value="rent"
          control={
            <Radio
              sx={{
                color: "brandColor.main",
                "&.Mui-checked": { color: "brandColor.main" },
              }}
            />
          }
          label="Rent"
        />
        <FormControlLabel
          value="sale"
          control={
            <Radio
              sx={{
                color: "brandColor.main",
                "&.Mui-checked": { color: "brandColor.main" },
              }}
            />
          }
          label="Sale"
        />
      </RadioGroup> */}
      <Stack
        spacing={1}
        direction="row"
        alignItems="center"
        sx={{ padding: "0.6rem 1.2rem 0.6rem 0" }}
      >
        <FilterListIcon fontSize="medium" />
        <Typography
          varaint="h4"
          sx={{ fontSize: { md: "1.2rem" }, fontWeight: 600 }}
        >
          Filters
        </Typography>
      </Stack>
      <StyledAccordion elevation={0} defaultExpanded={true}>
        <StyledAccordionSummary
          expandIcon={<StyledExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Type
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            // defaultValue="rent&sale"
            value={type}
            onChange={(e) => setType(e.target.value)}
            name="radio-buttons-group"
            sx={{
              "& .MuiFormControlLabel-root": {
                marginTop: -0.5,
              },
              "& .MuiFormControlLabel-root:first-child": {
                marginTop: 0,
              },
            }}
          >
            {[
              { value: "rentAndsale", label: "Rent And Sale" },
              { value: "rent", label: "Rent" },
              { value: "sale", label: "Sale" },
            ].map(({ value, label }, ind) => (
              <FormControlLabel
                key={ind}
                value={value}
                control={
                  <Radio
                    sx={{
                      color: "brandColor.main",
                      "&.Mui-checked": { color: "brandColor.main" },
                    }}
                    size="small"
                    onClick={(e) =>
                      setSearchParams((searchParams) => {
                        searchParams.set("type", value);
                        return searchParams;
                      })
                    }
                  />
                }
                label={label}
                sx={{ "& .MuiTypography-root": { fontSize: "0.85rem" } }}
              />
            ))}
          </RadioGroup>
        </StyledAccordionDetails>
      </StyledAccordion>

      {[
        {
          title: "Benefits",
          specification: [
            { label: "Airport within 10 km", field: "airport" },
            { label: "Bus Stand within 5 km", field: "bus" },
            { label: "Metro within 5 km", field: "metro" },
            { label: "Hospital within 7 km", field: "hospital" },
            { label: "Close to City Garden", field: "cityGarden" },
            {
              label: "Close to Shopping Centres",
              field: "shoppingCentres",
            },
          ],
        },
        {
          title: "Facilities",
          specification: [
            { label: "Open Floor Plan", field: "openFloorPlan" },
            { label: "Water 24 Hours", field: "water" },
            { label: "Electricity 1200 V.P.A", field: "electricity" },
            { label: "Secure Parking", field: "parking" },
            { label: "Modern Kitchen", field: "kitchen" },
            { label: "External Lighting", field: "externalLighting" },
          ],
        },
      ].map(({ title, specification }, indPrimary) => (
        <StyledAccordion elevation={0} key={indPrimary}>
          <StyledAccordionSummary
            expandIcon={<StyledExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            {title}
          </StyledAccordionSummary>
          <StyledAccordionDetails>
            <Stack
              sx={{
                "&.MuiStack-root>:not(style):not(style)": {
                  // bgcolor: "red",
                  margin: "0 16px 0 -11px",
                },
              }}
            >
              {specification.map(({ label, field }, indSecondary) => (
                <FormControlLabel
                  key={indSecondary}
                  control={
                    <Checkbox
                      sx={{
                        "&.Mui-checked": {
                          color: "brandColor.main",
                        },
                      }}
                      size="small"
                      checked={
                        title === "Benefits"
                          ? benefits[field]
                          : facilities[field]
                      }
                      onChange={(e) => {
                        title === "Benefits"
                          ? setBenefits((benefits) => {
                              return {
                                ...benefits,
                                [field]: e.target.checked,
                              };
                            })
                          : setFacilities((facilities) => {
                              return {
                                ...facilities,
                                [field]: e.target.checked,
                              };
                            });
                      }}
                      onClick={(e) =>
                        setSearchParams((searchParams) => {
                          if (e.target.checked) {
                            searchParams.append(title.toLowerCase(), field);
                          } else {
                            searchParams.delete(title.toLowerCase(), field);
                          }
                          return searchParams;
                        })
                      }
                    />
                  }
                  label={label}
                  sx={{ "& .MuiTypography-root": { fontSize: "0.85rem" } }}
                />
              ))}
            </Stack>
          </StyledAccordionDetails>
        </StyledAccordion>
      ))}
      <StyledAccordion elevation={0}>
        <StyledAccordionSummary
          expandIcon={<StyledExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Price
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ pb: 1.4 }}
            >
              <OutlinedInput
                sx={{
                  backgroundColor: "#FDFDFD",
                  height: "2.25rem",
                  color: "#696969",
                  borderRadius: 1,
                  "&:hover .MuiOutlinedInput-notchedOutline,&.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "brandColor.main",
                      // borderColor: props.theme.palette.brandColor.,
                    },
                }}
                {...register("min")}
                placeholder="MIN"
              />
              <OutlinedInput
                sx={{
                  backgroundColor: "#FDFDFD",
                  height: "2.25rem",
                  color: "#696969",
                  borderRadius: 1,
                  "&:hover .MuiOutlinedInput-notchedOutline,&.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "brandColor.main",
                      // borderColor: props.theme.palette.brandColor.,
                    },
                }}
                {...register("max")}
                placeholder="MAX"
              />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  bgcolor: "brandColor.main",
                  padding: "0.15rem 0.25rem",
                  borderRadius: 1,
                  color: "primary.main",
                  "&:hover": {
                    borderColor: "brandColor.main",
                    bgcolor: "rgb(0, 102, 255,0.9)",
                  },
                }}
              >
                Go
              </Button>
            </Stack>
          </form>
        </StyledAccordionDetails>
      </StyledAccordion>

      <StyledAccordion
        elevation={0}
        sx={{ "&.Mui-expanded:before": { opacity: 1 } }}
      >
        <StyledAccordionSummary
          expandIcon={<StyledExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Discount
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <Stack
            sx={{
              "&.MuiStack-root>:not(style):not(style)": {
                // bgcolor: "red",
                margin: "0 16px 0 -11px",
              },
            }}
          >
            {[
              { label: "50% or more", value: "moreThanOrEqualTo50" },
              { label: "40% or more", value: "moreThanOrEqualTo40" },
              { label: "30% or more", value: "moreThanOrEqualTo30" },
              { label: "20% or more", value: "moreThanOrEqualTo20" },
              { label: "10% or more", value: "moreThanOrEqualTo10" },
              { label: "10% or less", value: "lessThanOrEqualTo10" },
            ].map(({ label, value }, indSecondary) => (
              <FormControlLabel
                key={indSecondary}
                control={
                  <Checkbox
                    sx={{
                      "&.Mui-checked": {
                        color: "brandColor.main",
                      },
                    }}
                    size="small"
                    checked={discounts[value]}
                    onChange={(e) => {
                      setDiscounts((discounts) => {
                        return {
                          ...discounts,
                          [value]: e.target.checked,
                        };
                      });
                    }}
                    onClick={(e) =>
                      setSearchParams((searchParams) => {
                        if (e.target.checked) {
                          searchParams.append("discount", value);
                        } else {
                          searchParams.delete("discount", value);
                        }
                        return searchParams;
                      })
                    }
                  />
                }
                label={label}
                sx={{ "& .MuiTypography-root": { fontSize: "0.85rem" } }}
              />
            ))}
          </Stack>
        </StyledAccordionDetails>
      </StyledAccordion>
    </Box>
  );
}

export default SearchFilter;
