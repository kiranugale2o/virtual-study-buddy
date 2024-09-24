export const studentFormFields = [
  {
    label: "Full Name",
    name: "fullName",
    placeholder: "Enter your full Name ",
    contentType: "input",
  },
  {
    label: "college",
    name: "college",
    placeholder: "Enter your college  Name ",
    contentType: "input",
  },
  {
    label: "Current Education",
    name: "CurrentEducation",
    placeholder: "Enter your Current Education ",
    contentType: "input",
  },
  {
    label: " What are you studying ?",
    name: "subjectsOfInterest",
    placeholder: "E.g. java,python,physics,math",
    contentType: "textarea",
  },
  {
    label: "Study Methods",
    name: "preferredStudyMethods",
    placeholder: "E.g. video call ,chat ,In-person",
    contentType: "input",
  },

  {
    label: "location",
    name: "location",
    placeholder: "Enter your location",
    contentType: "input",
  },
  {
    label: "Profile Picture",
    name: "ProfilePicture",
    placeholder: "Enter your location",
    contentType: "file",
  },
];

export const studenInitialData = {
  fullName: "",
  email: "",
  college: "",
  CurrentEducation: "",
  subjectsOfInterest: [],
  preferredStudyMethods: [],
  location: "",
  profilePicture: "",
};
