// An enumeration to represent the day of the week.
export enum DayOfWeek {
    SUNDAY = "sunday",
    MONDAY = "monday",
    TUESDAY = "tuesday",
    WEDNESDAY = "wednesday",
    THURSDAY = "thursday",
    FRIDAY = "friday",
    SATURDAY = "saturday",
}

// An entity for the availability schedule of a vendor.
export type Availability = {
    // The day of the week the vendor operates.
    day_of_week: DayOfWeek;

    // The opening time for the vendor on the specified day.
    open_time: Date;

    // The closing time for the vendor on the specified day.
    close_time: Date;

    // Indicates whether the vendor is active on the specified day.
    active: boolean;
};
