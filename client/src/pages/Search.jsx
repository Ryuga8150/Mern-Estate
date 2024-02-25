import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";

import SearchFilter from "../components/SearchFilter";
import SearchListings from "../components/SearchListings";

const StyledContainer = styled(Container)({
  padding: "1.2rem 0",
  height: "calc(100vh - 110px)",
});
// const StyledTextField = styled(TextField)((props) => ({
//   "&:hover .MuiFormLabel-root": {
//     color: props.theme.palette.brandColor.main,
//   },
//   "& .MuiFormLabel-root.Mui-focused": {
//     // color: "rgba(0,0,0,0.6)",
//     color: props.theme.palette.brandColor.main,
//   },
//   "& .MuiInputBase-root": {
//     "& .MuiOutlinedInput-notchedOutline": {
//       borderColor: "rgba(0,0,0,0.23)",
//       borderWidth: 1,
//     },
//     "&.Mui-focused, &:hover": {
//       "& .MuiOutlinedInput-notchedOutline": {
//         borderColor: props.theme.palette.brandColor.light2,
//         borderWidth: 1,
//       },
//     },
//   },
// }));

// const StyledCheckbox = styled(Checkbox)((props) => ({
//   "&.Mui-checked": {
//     color: props.theme.palette.brandColor.main,
//   },
// }));

function Search() {
  // const { register, reset, handleSubmit, control, setValue } = useForm({
  //   defaultValues: {
  //     sortBy: "createdAt_desc",
  //     type: "all",
  //   },
  // });
  // console.log("rendered");
  // const [searchParams, setSearchParams] = useSearchParams();
  // const [listings, setListings] = useState(null);
  // const [age, setAge] = useState("createdAt_desc");

  // const params = [];
  // searchParams.forEach((value, key) => {
  //   // console.log(value, key);
  //   params.push([key, value]);
  // });
  // // console.log(params);

  // const onSubmit = function (formData) {
  //   console.log(formData);
  //   let params = {};
  //   Object.entries(formData).forEach(([key, value]) => {
  //     // console.log(key, value);
  //     if (value === undefined || value === null || value === false) {
  //       // console.log("Entered");
  //       return;
  //     }

  //     params[key] = `${value}`;
  //   });

  //   // console.log(params);

  //   setSearchParams({
  //     ...params,
  //     sortBy: params.sortBy.split("_")[0],
  //     order: params.sortBy.split("_")[1],
  //   });
  // };
  // const onError = function (err) {
  //   console.log(err);
  // };

  // useEffect(
  //   function () {
  //     const fetchListings = async () => {
  //       try {
  //         // const res = await fetch(`/api/listing/get?${apiQueryParams}`);
  //         const res = await fetch(`/api/listing/get`);
  //         const data = await res.json();
  //         // console.log(data);
  //         setListings(data.data.listings);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     fetchListings();
  //   },
  //   [searchParams, setValue, reset]
  // );

  return (
    <StyledContainer
      maxWidth="lg"
      sx={{
        paddingLeft: {
          sm: 1.6,
        },
        paddingRight: {
          sm: 0,
        },
        // height: "100%",
        height: "calc(100vh - 110px)",
        backgroundColor: "#FAFAFA",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "0.5fr 1.5fr",
          columnGap: 5,
          height: "100%",
        }}
      >
        {/* <form
          onSubmit={handleSubmit(onSubmit, onError)}
          style={{
            height: "100%",
            overflowY: "scroll",
            backgroundColor: "#fff",
          }}
        ></form> */}
        <SearchFilter />

        <SearchListings />
      </Box>
    </StyledContainer>
  );
}

export default Search;
