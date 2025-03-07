us_state_to_abbrev = {
    "alabama": "AL",
    "alaska": "AK",
    "arizona": "AZ",
    "arkansas": "AR",
    "california": "CA",
    "colorado": "CO",
    "connecticut": "CT",
    "delaware": "DE",
    "florida": "FL",
    "georgia": "GA",
    "hawaii": "HI",
    "idaho": "ID",
    "illinois": "IL",
    "indiana": "IN",
    "iowa": "IA",
    "kansas": "KS",
    "kentucky": "KY",
    "louisiana": "LA",
    "maine": "ME",
    "maryland": "MD",
    "massachusetts": "MA",
    "michigan": "MI",
    "minnesota": "MN",
    "mississippi": "MS",
    "missouri": "MO",
    "montana": "MT",
    "nebraska": "NE",
    "nevada": "NV",
    "new hampshire": "NH",
    "new jersey": "NJ",
    "new mexico": "NM",
    "new york": "NY",
    "north carolina": "NC",
    "north dakota": "ND",
    "ohio": "OH",
    "oklahoma": "OK",
    "oregon": "OR",
    "pennsylvania": "PA",
    "rhode island": "RI",
    "south carolina": "SC",
    "south dakota": "SD",
    "tennessee": "TN",
    "texas": "TX",
    "utah": "UT",
    "vermont": "VT",
    "virginia": "VA",
    "washington": "WA",
    "west virginia": "WV",
    "wisconsin": "WI",
    "wyoming": "WY",
    "district of columbia": "DC",
    "american samoa": "AS",
    "guam": "GU",
    "northern mariana islands": "MP",
    "puerto rico": "PR",
    "united states minor outlying islands": "UM",
    "virgin islands, U.S.": "VI",
}

states = ["alabama", "alaska", "arizona", "arkansas", "california", "colorado", "connecticut", "delaware", "district of columbia", "florida", "georgia", "guam", "hawaii", "idaho", "illinois", "indiana", "iowa", "kansas", "kentucky", "louisiana", "maine", "maryland", "massachusetts", "michigan", "minnesota", "mississippi", "missouri", "montana", "nebraska", "nevada", "new hampshire", "new jersey", "new mexico", "new york", "north carolina", "north dakota", "ohio", "oklahoma", "oregon", "pennsylvania", "puerto rico", "rhode island", "south carolina", "south dakota", "tennessee", "texas", "utah", "vermont", "virgin islands", "virginia", "washington", "west virginia", "wisconsin", "wyoming"]

nums = [0.1080, 0.0000, 0.0154, 0.0000, 0.0391, 0.0102, 0.0147, 0.0384, 0.0031, 0.0733, 0.0537, 0.0000, 0.0064, 0.0000, 0.0487, 0.0081, 0.0004, 0.0001, 0.0238, 0.0336, 0.0009, 0.0064, 0.0156, 0.0246, 0.0153, 0.0004, 0.0001, 0.0000, 0.0064, 0.0081, 0.0105, 0.0237, 0.0000, 0.1227, 0.0060, 0.0000, 0.0246, 0.0000, 0.0036, 0.0790, 0.0000, 0.0000, 0.0040, 0.0000, 0.0455, 0.0568, 0.0002, 0.0000, 0.0000, 0.0343, 0.0123, 0.0177, 0.0109, 0.0000]

print("States: ", len(states))
print("Nums: ", len(nums))

def create_json(keys, values):
    # Combine the keys and values into a dictionary
    json_data = dict(zip(keys, values))
    return json_data


result = create_json(states, nums)
print(result)
