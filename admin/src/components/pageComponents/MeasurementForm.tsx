import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { School, StudentFormProps } from "@/services/types";
import useFetch from "@/services/hooks/UseRequest";
import { useAuth } from "@/services/hooks/auth";

const MeasurementForm: React.FC<StudentFormProps> = ({
  student,
  category,
  setCategory,
  selectedSchool,
  setSelectedSchool,
}) => {
  const { user } = useAuth();

  const { data: responseData } = useFetch<{ data: School[] }>("schools");
  const selectedSchoolAlready = responseData?.data?.find(
    (school) => school.email === user?.email
  );
  console.log(selectedSchoolAlready);

  const schools = responseData?.data || [];
  return (
    <>
      {user?.role === "schoolManager" ? (
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel id="school-label">Schools</InputLabel>
            <Select
              labelId="school-label"
              id="school-select"
              label="Select School"
              name="schoolId"
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
            >
              <MenuItem value={selectedSchoolAlready?.id}>
                {selectedSchoolAlready?.name}
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      ) : (
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel id="school-label">Schools</InputLabel>
            <Select
              labelId="school-label"
              id="school-select"
              label="Select School"
              name="schoolId"
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
              disabled={!!student?.id}
            >
              {schools.map((data) => {
                return (
                  <MenuItem key={data.id} value={data.id}>
                    {data.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      )}

      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Student Name"
          name="name"
          fullWidth
          defaultValue={student?.name || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Class Name"
          name="class"
          fullWidth
          defaultValue={student?.class || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Guardian Number"
          name="mobile"
          fullWidth
          defaultValue={student?.mobile || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            label="Select Category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="shirtHalf">Shirt Slim Fit(Half Sleeve)</MenuItem>
            <MenuItem value="shirtRegular"> Shirt Regular Fit</MenuItem>
            <MenuItem value="frock">Frock</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Total Uniforms"
          name="total"
          fullWidth
          defaultValue={student?.total || ""}
          InputLabelProps={{ shrink: true }}
          type="number"
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Height"
          name="height"
          fullWidth
          defaultValue={student?.height || ""}
          InputLabelProps={{ shrink: true }}
          type="number"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Length"
          name="length"
          fullWidth
          defaultValue={student?.length || ""}
          InputLabelProps={{ shrink: true }}
          type="number"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Shoulder"
          name="shoulder"
          fullWidth
          defaultValue={student?.shoulder || ""}
          InputLabelProps={{ shrink: true }}
          type="number"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Sleeve Length"
          name="sleeveLength"
          fullWidth
          defaultValue={student?.sleeveLength || ""}
          InputLabelProps={{ shrink: true }}
          type="number"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Collar"
          name="collar"
          fullWidth
          defaultValue={student?.collar || ""}
          InputLabelProps={{ shrink: true }}
          type="number"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Arm Hole"
          name="armhole"
          fullWidth
          defaultValue={student?.armhole || ""}
          InputLabelProps={{ shrink: true }}
          type="number"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Sleeve Open"
          name="sleeveOpening"
          fullWidth
          defaultValue={student?.sleeveOpening || ""}
          InputLabelProps={{ shrink: true }}
          type="number"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Waist"
          name="waist"
          fullWidth
          defaultValue={student?.waist || ""}
          InputLabelProps={{ shrink: true }}
          type="number"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Waist Size"
          name="waistSize"
          fullWidth
          defaultValue={student?.waistSize || ""}
          InputLabelProps={{ shrink: true }}
          type="number"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Hips"
          name="hips"
          fullWidth
          defaultValue={student?.hips || ""}
          InputLabelProps={{ shrink: true }}
          type="number"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Bottom Hem"
          name="bottomHem"
          fullWidth
          defaultValue={student?.bottomHem || ""}
          InputLabelProps={{ shrink: true }}
          type="number"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Half Body"
          name="halfBody"
          fullWidth
          defaultValue={student?.halfBody || ""}
          InputLabelProps={{ shrink: true }}
          type="number"
        />
      </Grid>
    </>
  );
};

export default MeasurementForm;
