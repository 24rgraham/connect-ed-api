const sequelize = require("../config/connection");
const { User, Project, Status, Subject, Curriculum, CurriculumTag, SubjectTag } = require("../models");

const userData = [
  {
    name: "John Cusack",
    email: "john@cusack.com",
    password: "Iamjohn",
    first_name: "John",
    last_name: "Cusack",
    school: "Roosevelt",
    city: "Seattle",
    state: "WA",
    language: "English",
    profile_picture: null,
  },
  {
    name: "Jack Sparrow",
    email: "jack@sparrow.com",
    password: "Iamthecaptain",
    first_name: "Jack",
    last_name: "Sparrow",
    school: "Ballard",
    city: "Seattle",
    state: "WA",
    language: "Pirate English",
    profile_picture: null,
  },
  {
    name: "Harry Potter",
    email: "yourawizard@harry.com",
    password: "voldemort",
    first_name: "Harry",
    last_name: "Potter",
    school: "Garfield",
    city: "Seattle",
    state: "WA",
    language: "British English",
    profile_picture: null,
  },
];

const projectData = [
  {
    title: "Build a table",
    image: "https://www.placekitten.com/200/300",
    grade_lvl: "8",
    est_time: 4,
    overview_desc: "blahdgak;lajnert",
    directions: "Step one .. somganargre step two..adfgagrdf",
    materials: "arknjgaerjng;kaerjngaergregr aregaer aergrsd",
    resources: "new;lkrnwe5 vlkewn;r nergre",
    UserId: 2,
  },
  {
    title: "Paint a wall",
    image: "https://www.placekitten.com/200/300",
    grade_lvl: "8",
    est_time: 4,
    overview_desc: "blahdgak;lajnert",
    directions: "Step one: pick a wall-- Step two: start painting",
    materials: "ark njgae rjng;kaerjng naergregr aregaer aergrsd",
    resources: "ne w;lkr nwe5 vlkewn;r  nergre",
    UserId: 1,
  },
]

const curriculumData = [
  {
    name: "Montessori",
  },
  {
    name: "PBL",
  },
  {
    name: "Beetles",
  },
  {
    name: "Waldorf",
  },
]

const subjectData = [
  {
    name: "STEM",
  },
  {
    name: "SEL",
  },
  {
    name: "Culture",
  },
  {
    name: "PE",
  },
  {
    name: "Literature",
  },
  {
    name: "Computer Science",
  },
  {
    name: "Civics",
  },
  {
    name: "History",
  },
  {
    name: "Art",
  },
  {
    name: "Woodworking",
  },
  {
    name: "Maths",
  },
  {
    name: "Nature",
  },
]

const curriculumTagData = [
  {
    CurriculumId: 1,
    ProjectId: 1,
  },
  {
    CurriculumId: 4,
    ProjectId: 2,
  },
]

const subjectTagData = [
  {
    SubjectId: 10,
    ProjectId: 1,
  },
  {
    SubjectId: 9,
    ProjectId: 2,
  },
  {
    SubjectId: 3,
    ProjectId: 2,
  },
]

const statusData = [
  {
    in_progress: true,
    UserId: 1,
    ProjectId: 1,
  },
  {
    saved_for_later: true,
    UserId: 2,
    ProjectId: 2,
  },
  {
    starred: true,
    UserId: 3,
    ProjectId: 1,
  },
  {
    completed: true,
    UserId: 2,
    ProjectId: 1,
  },
]


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  const project = await Project.bulkCreate(projectData);
  const subject = await Subject.bulkCreate(subjectData);
  const curriculum = await Curriculum.bulkCreate(curriculumData);
  const status = await Status.bulkCreate(statusData);

  const curriculumTag = await CurriculumTag.bulkCreate(curriculumTagData);
  const subjectTag = await SubjectTag.bulkCreate(subjectTagData);
};

seedDatabase();