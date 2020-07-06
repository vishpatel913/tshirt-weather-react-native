def calculate_clothing(temp, cloud):
    if cloud == None:
        cloud = 0
    upper = 4
    lower = 1
    cloudConst = 6 * cloud / 100
    if (temp >= cloudConst + 23):
        upper = 1
        lower = 0
    elif (temp >= cloudConst + 18):
        upper = 1
    elif (temp >= cloudConst + 12):
        upper = 2
    elif (temp >= cloudConst + 6):
        upper = 3
    return {
        "upper": upper,
        "lower": lower,
    }
