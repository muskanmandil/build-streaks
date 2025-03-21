const calculateDaysDiff = (date1, date2) => {
    // Parse the date strings into Date objects
    const d1 = new Date(
        `${date1.slice(6, 10)}-${date1.slice(3, 5)}-${date1.slice(0, 2)}`
    );
    const d2 = new Date(
        `${date2.slice(6, 10)}-${date2.slice(3, 5)}-${date2.slice(0, 2)}`
    );

    // Calculate the time difference in milliseconds
    const timeDiff = Math.abs(d2.getTime() - d1.getTime());

    // Convert the time difference from milliseconds to days
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
};

module.exports = { calculateDaysDiff };