import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CustomButton from "../../Common/button/Button";
import LIVEFormattedProjectData from "../../../components/Common/test/LIVEFormattedProjectData.json";

interface Team {
  "Team Club": string;
  "Team Name": string;
  Data: {
    "Mem No": string;
    Name: string;
    Pts: number | null;
    Club: string;
    Missing: boolean;
  }[];
}

/**
 * Renders a team selection component.
 *
 * This component allows the user to select a team category and team type, and displays a table of teams based on the selected category and type.
 * The user can enter member details for each team in the table.
 * The component also provides a save button to save the entered data.
 *
 * @returns {JSX.Element} The team selection component.
 */
function TeamSelection() {
  const navigate = useNavigate();
  const [teamCategory, setTeamCategory] = useState("Adult");
  const [teamType, setTeamType] = useState("Open");
  const [teamsData, setTeamsData] = useState<Team[]>([]);

  // const handleCategoryChange = (
  //   event: React.ChangeEvent<{ value: unknown }>,
  // ) => {
  //   setTeamCategory(event.target.value as string);
  // };

  const handleCategoryChange = (event: SelectChangeEvent<any>) => {
    setTeamCategory(event.target.value);
  };

  const handleTypeChange = (event: SelectChangeEvent<any>) => {
    setTeamType(event.target.value);
  };

  const handleSave = () => {
    // Save data here
  };

  React.useEffect(() => {
    const teams = LIVEFormattedProjectData.data.teams.find(
      (team) =>
        team["Team Category"] === teamCategory &&
        team["Team Type"] === teamType,
    )?.teams;

    if (teams) {
      setTeamsData(teams as Team[]);
      // console.log(teams[JSON.parse("Team Name")]);
    }
  }, [teamCategory, teamType]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h1">Team Selection</Typography>
        <SaveIcon onClick={handleSave} />
        <CustomButton text="next" onClick={() => navigate("/finaldraw")} />
      </Grid>
      <Grid item xs={6}>
        <Select value={teamCategory} onChange={handleCategoryChange}>
          <MenuItem value="Adult">Adult</MenuItem>
          <MenuItem value="Junior">Junior</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={6}>
        <Select value={teamType} onChange={handleTypeChange}>
          <MenuItem value="Open">Open</MenuItem>
          <MenuItem value="Mixed">Mixed</MenuItem>
          <MenuItem value="Womens">Women's</MenuItem>
        </Select>
      </Grid>
      {/* {teamsData.map((team) => (
        console.log("Key:", team.id); // Log the value of the key prop
        return <div key={item.id}>{item.text}</div>;
      })} */}
      {teamsData.map((team) => (
        <Grid item xs={12} key={team["Team Name"]}>
          {/* Warning happens because of Team Name, some of teams are in both OPEN and MIXED, tho i have filtered to use it, since they are in same JSON in 2 places
            the system takes it as duplication of keys. */}
          {/* <div key={team["Team Name"]}>
            {team["Team Club"]}, {team["Team Name"]} 
          </div> */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{team["Team Name"]}</TableCell>
                  <TableCell>{team["Team Club"]}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Mem No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Pts</TableCell>
                  <TableCell>Club</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {team.Data.map((data, index) => (
                  <TableRow key={data["Mem No"]}>
                    {data.Missing ? (
                      <>
                        <TableCell>
                          <TextField
                            value={data["Mem No"]}
                            placeholder="Member number"
                            onChange={(event) =>
                              setTeamsData((prev) =>
                                prev.map((t) =>
                                  t["Team Name"] === team["Team Name"]
                                    ? {
                                        ...t,
                                        Data: t.Data.map((d, i) =>
                                          i === index
                                            ? {
                                                ...d,
                                                "Mem No": event.target.value,
                                              }
                                            : d,
                                        ),
                                      }
                                    : t,
                                ),
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={data.Name}
                            placeholder="Member Name"
                            onChange={(event) =>
                              setTeamsData((prev) =>
                                prev.map((t) =>
                                  t["Team Name"] === team["Team Name"]
                                    ? {
                                        ...t,
                                        Data: t.Data.map((d, i) =>
                                          i === index
                                            ? {
                                                ...d,
                                                Name: event.target.value,
                                              }
                                            : d,
                                        ),
                                      }
                                    : t,
                                ),
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={data.Pts}
                            placeholder="Member points"
                            onChange={(event) =>
                              setTeamsData((prev) =>
                                prev.map((t) =>
                                  t["Team Name"] === team["Team Name"]
                                    ? {
                                        ...t,
                                        Data: t.Data.map((d, i) =>
                                          i === index
                                            ? {
                                                ...d,
                                                Pts: Number(event.target.value),
                                              }
                                            : d,
                                        ),
                                      }
                                    : t,
                                ),
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={data.Club}
                            placeholder="Member club"
                            onChange={(event) =>
                              setTeamsData((prev) =>
                                prev.map((t) =>
                                  t["Team Name"] === team["Team Name"]
                                    ? {
                                        ...t,
                                        Data: t.Data.map((d, i) =>
                                          i === index
                                            ? {
                                                ...d,
                                                Club: event.target.value,
                                              }
                                            : d,
                                        ),
                                      }
                                    : t,
                                ),
                              )
                            }
                          />
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{data["Mem No"]}</TableCell>
                        <TableCell>{data.Name}</TableCell>
                        <TableCell>{data.Pts}</TableCell>
                        <TableCell>{data.Club}</TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      ))}
    </Grid>
  );
}

export default TeamSelection;
