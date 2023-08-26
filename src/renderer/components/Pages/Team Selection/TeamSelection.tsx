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
    }
  }, [teamCategory, teamType]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h1">Team Selection</Typography>
        <SaveIcon onClick={handleSave} />
        <CustomButton
          text="next"
          onClick={() =>
            navigate("/createproject/import/teamselection/finaldraw")
          }
        />
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
      {teamsData.map((team) => (
        <Grid item xs={12} key={team["Team Name"]}>
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
                  <TableRow key={index}>
                    {data.Missing ? (
                      <>
                        <TableCell>
                          <TextField
                            value={data["Mem No"]}
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
                            onChange={(event) =>
                              setTeamsData((prev) =>
                                prev.map((t) =>
                                  t["Team Name"] === team["Team Name"]
                                    ? {
                                        ...t,
                                        Data: t.Data.map((d, i) =>
                                          i === index
                                            ? { ...d, Name: event.target.value }
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
                            onChange={(event) =>
                              setTeamsData((prev) =>
                                prev.map((t) =>
                                  t["Team Name"] === team["Team Name"]
                                    ? {
                                        ...t,
                                        Data: t.Data.map((d, i) =>
                                          i === index
                                            ? { ...d, Club: event.target.value }
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
