import { AnySoaRecord } from "dns";

export function formatRawData(rawJson: any) {
  const data: { [key: string]: any } = {};
  // Loop over each key
  for (const key in rawJson) {
    // Do something with each key
    switch (key) {
      case "Teams":
        data["Teams"] = formatTeams(rawJson[key]);
        break;

      case "Pool Players":
        data["Pool Players"] = formatCommon(rawJson[key]);
        break;

      case "Umpires":
        data["Umpires"] = formatCommon(rawJson[key]);
        break;
    }
  }

  return data;
}

function formatCommon(rawObj: any) {
  const returnData = [] as Array<any>;

  const headers: Array<any> = Object.values(rawObj[2]);

  for (let i = 3; i < rawObj.length; i++) {
    const rawRow: Array<any> = Object.values(rawObj[i]);
    const row: { [key: string]: any } = {};
    for (let x = 0; x < headers.length; x++) {
      row[headers[x]] = rawRow[x];
    }
    returnData.push(row);
  }

  return returnData;
}

function formatTeams(rawObj: any) {
  let data = [];
  let teamCat: { [key: string]: any } = {};
  let team: { [key: string]: any } = {};
  for (let i = 0; i < rawObj.length; i++) {
    // Start of team category

    if (rawObj[i]["Teams List"] == "Team Category:") {
      // First team category
      if (Object.keys(teamCat).length === 0) {
        teamCat["Team Category"] = rawObj[i]["__EMPTY"];
        teamCat["Team Type"] = rawObj[i]["Page 1"];
        teamCat["teams"] = [] as Array<any>;
      } else {
        data.push(teamCat);
        teamCat = {};
        teamCat["Team Category"] = rawObj[i]["__EMPTY"];
        teamCat["Team Type"] = rawObj[i]["Page 1"];
        teamCat["teams"] = [] as Array<any>;
      }
    }
    // Start team
    else if (rawObj[i]["Teams List"] == "Team Club:") {
      team["Team Club"] = rawObj[i]["__EMPTY"];
      team["Team Name"] = rawObj[i]["Page 1"];

      team["Data"] = getMembers(rawObj, i + 3, rawObj[i + 2]);
      team["Team Total"] = rawObj[i + 9]["__EMPTY_1"];
      teamCat["teams"].push(team);
      team = {};
    }
  }
  return data;
}

function getMembers(rawObj: any, startIndex: any, headers: any) {
    // Array of objects
    const members = [] as Array<any>;
    // Object
    let member: {[key: string]: any} = {};
    const headerKeys: Array<any> = Object.values(headers);
    // For each member row in raw data
    for (let i = startIndex; i <= startIndex+6; i++) {
        // Get array of keys in this row
        const keys = Object.keys(rawObj[i]);
        // For exactly 4 fields
        for (let x = 0; x < 4; x++) {
            if (keys[x] in rawObj[i]) {
                member[headerKeys[x]] = rawObj[i][keys[x]];
            } else {
                member[headerKeys[x]] = "";
            }
            
        }
        if (member["Mem No"] == 0 || member["Mem No"] == "Player Required") {
            member["Missing"] = true;
            member["Name"] = "Player Required";
            member["Mem No"] = "";
            member["Pts"] = null;
        } else {
            member["Missing"] = false;
        }
        members.push(member);
        member = {};
    }
    if (member["Mem No"] == 0 || member["Mem No"] == "Player Required") {
      member["Missing"] = true;
      member["Name"] = "Player Required";
      member["Mem No"] = 0;
    } else {
      member["Missing"] = false;
    }
    members.push(member);
    member = {};
  return members;
}