import { any } from 'prop-types';
import teamsJson from './test/teams.json'


/*
This function spilts a competition into grades

Requirements:
The file passed needs to only contain the teams of one competition category and type.
The file must already have the teams orders via points
*/
export function gradeGen() {
    const teams = teamsJson;

    // Check for invalid ammount of teams. I.e 0 or 1 teams
    if (teams['teams'].length <= 1) {
        return {
            "status": "0",
            "reason": "There is not enough teams in this category/type\nCategory: " + teams['Team Category'] +
                "\nType: " + teams['Team Type']
        };
    }

    // Need to group the teams together based on the points
    // Requirements - have at least 3 teams in a grade - ideallaly 4 teams
    // Group the closest points together
    let gradings = groupTeams(teams);
    
    // Now need to even the grades out - the last grade could have 1 or 2 teams in it.
    gradings = evenGradesOut(gradings);
    
    
    

    return null;
}


/*
This function is aiming to get the teams into groups of 4. 
Only going up to 5 or down to 3 if needed

Returns: An array of JSONS in the format of
returnedTeams = {
    "Team Category": "Category",
    "Team Type": "Type",
    "grades":
    [
        {
            "grade": "A",
            "teams": [
                {}
            ]
        }
    ]
}
*/
function groupTeams(teams: any) {
    let gradeLetter = 'A';
    let returnTeams = {
        "Team Category": teams['Team Category'],
        "Team Type": teams['Team Type'],
        "grades":
            [] as Array<any>
    }

    const chunkSize = 4;
    for (let i = 0; i < teams['teams'].length; i += chunkSize) {
        let grade = {"grade": gradeLetter,
            "teams": [] as Array<any>
        };
        var chunk = teams['teams'].slice(i, i + chunkSize);
        grade['teams'] = grade['teams'].concat(chunk);

        returnTeams['grades'].push(grade);
        gradeLetter = nextChar(gradeLetter);
    }

    return returnTeams;

}

/*
This function evens out the grades. As they are chunked together, 
so the last grade could have 1 or 2 teams in it

Returns:
The same 'grades' var as given, but evened out.
*/
function evenGradesOut(grades: any) {
    //console.log(grades)
    // If the last grade has two teams, need to merge up
    if (grades['grades'].at(-1)['teams'].length == 2) {
        // First situation, there are at least three grades
        // Move a team from the second grade up one
        // Concat bottom teams to the second grade
        if (grades['grades'].length >= 3) {
            // First move the first team from the second last grade up to the end of the next grade
            grades['grades'].at(-3)['teams'].push(grades['grades'].at(-2)['teams'][0]);
            grades['grades'].at(-2)['teams'].shift();

            // Next, concat last grade to second grade. Then remove last grade
            grades['grades'].at(-2)['teams'] = grades['grades'].at(-2)['teams'].concat(grades['grades'].at(-1)['teams']);
            grades['grades'].pop();
        }

        // Second situation
        // Only two grades, need to combine the two grades into one
        else if (grades['grades'].length == 2) {
            grades['grades'][0]['teams'] = grades['grades'][0]['teams'].concat(grades['grades'][1]['teams']);
            grades['grades'].pop();
        }
        
    } 
    // If the grade has one team - need to combine with the grade above
    else if (grades['grades'].at(-1)['teams'].length == 1) {
        grades['grades'].at(-2)['teams'] = grades['grades'].at(-2)['teams'].concat(grades['grades'].at(-1)['teams']);
        grades['grades'].pop();
    }

    return grades;
}

function nextChar(c: any) {
    if (c == 'Z') {
        return '';
    }
    return String.fromCharCode(c.charCodeAt(0) + 1);
}



