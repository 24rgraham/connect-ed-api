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
    city: "Bethleham",
    state: "PA",
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
    title: "Debris Hut Survival Shelter",
    image: "https://photos.app.goo.gl/3pTRSnHnpZJhdHHG6",
    grade_lvl: "9",
    est_time: 4,
    overview_desc: "Learn about the physics of heat, and construction in this Social Emotional building, creative team challenge.",
    directions: "These will be detailed directions that would include: a timeline of expectations, what students will be doing every step of the way, how to break them into teams (if need be), instructions on what each team/student should be doing and when, safety measures, how to set up for the project/assignment, etc.’",
    materials: "A materials list that includes quantity for each child/class, where to source them if unique, etc.",
    resources: "https://www.youtube.com/watch?v=tzUpH0Zft5c",
    UserId: 2,
  },
  {
    title: "Garlic Grow",
    image: "https://placekitten.com/300/200",
    grade_lvl: "8",
    est_time: 8,
    overview_desc: "Growing Garlic is the perfect school-year long exploration in the cycle of growing to eating food. Garlic is accessible, and easy to plant. A variety of containers will suit your needs if garden space is not available ",
    directions: "These will be detailed directions that would include: a timeline of expectations, what students will be doing every step of the way, how to break them into teams (if need be), instructions on what each team/student should be doing and when, safety measures, how to set up for the project/assignment, etc.’",
    materials: "A materials list that includes quantity for each child/class, where to source them if unique, etc.",
    resources: "new;lkrnwe5 vlkewn;r nergre",
    UserId: 2,
  },
  {
    title: "Corn Husk Dolls",
    image: "https://placekitten.com/300/200",
    grade_lvl: "K",
    est_time: 6,
    overview_desc: "This Project explores North American Indigenous culture in a hands on craft while creating lots of space for discussions around history",
    directions: "These will be directions that include a timeline of expectations, what students will be doing every step of the way, how to break them into teams (if need be), instructions on what each team/student should be doing and when, safety measures, how to set up for the project/assignment, etc.",
    materials: "ark njgae rjng;kaerjng naergregr aregaer aergrsd",
    resources: "ne w;lkr nwe5 vlkewn;r  nergre",
    UserId: 1,
  },
  {
    title: "Build a table",
    image: "https://placekitten.com/300/200",
    grade_lvl: "8",
    est_time: 8,
    overview_desc: "Growing Garlic is the perfect school-year long exploration in the cycle of growing to eating food. Garlic is accessible, and easy to plant. A variety of containers will suit your needs if garden space is not available ",
    directions: "Step one .. somganargre step two..adfgagrdf",
    materials: "arknjgaerjng;kaerjngaergregr aregaer aergrsd",
    resources: "new;lkrnwe5 vlkewn;r nergre",
    UserId: 2,
  },
  {
    title: "Count to 5",
    image: "https://placekitten.com/300/200",
    grade_lvl: "12",
    est_time: 5,
    overview_desc: "b  lahdg  ak;la   jnert",
    directions: "Step 1: say 1.. Step 2: say 2.. Step 3: say 3.. Step 4: say 4.. Step 5: say 5.. Step 6: Party",
    materials: "rev a;dkvjre nPINGAE",
    resources: "new;SSlkrnwASDe5 vlkewn;r nergre",
    UserId: 1,
  },
  {
    title: "DO A BACKFLIP",
    image: "https://placekitten.com/300/200",
    grade_lvl: "1",
    est_time: 1,
    overview_desc: "I didnt realize caps lock was on when i typed the title",
    directions: "Step one: do a backflip",
    materials: "trampoline.",
    resources: "ne w;lkr nwe5 vlkewn;r  nergre",
    UserId: 3,
  },
]

const curriculumData = [
  {
    id: 1,
    name: "Montessori",
  },
  {

    id: 2,
    name: "Waldorf",
  },
  {
    id: 3,
    name: "Standard",
  },
  {
    id: 4,
    name: "PBL",
  },
  {
    id: 5,
    name: "Reggio Emilia",
  },
  {
    id: 6,
    name: "B.E.E.T.L.E.S (Outdoor Ed.)",
  },
]

const subjectData = [
  {
    id: 1,
    name: "Art",
  },
  {

    id: 2,
    name: "Maths",
  },
  {
    id: 3,
    name: "History",
  },
  {
    id: 4,
    name: "SEL",
  },
  {
    id: 5,
    name: "Woodworking",
  },
  {
    id: 6,
    name: "Anthropologie",
  },
  {
    id: 7,
    name: "Science",
  },
  {
    id: 8,
    name: "English",
  },
  {
    id: 9,
    name: "Writing",
  },
  {
    id: 10,
    name: "Spanish",
  },
  {
    id: 11,
    name: "French",
  },
  {
    id: 12,
    name: "Outdoor",
  },
  {
    id: 13,
    name: "Physical Education",
  },
  {
    id: 14,
    name: "Cultural Holidays",
  },
  {
    id: 15,
    name: "Culture",
  },
  {
    name: "Science",
  },
  
]

const curriculumTagData = [
  {
    CurriculumId: 3,
    ProjectId: 1,
  },
  {
    CurriculumId: 4,
    ProjectId: 2,
  },
  {
    CurriculumId: 3,
    ProjectId: 3,
  },
  {
    CurriculumId: 1,
    ProjectId: 4,
  },
]

const subjectTagData = [
  {
    SubjectId: 13,
    ProjectId: 1,
  },
  {
    SubjectId: 12,
    ProjectId: 1,
  },
  {
    SubjectId: 2,
    ProjectId: 1,
  },
  {
    SubjectId: 3,
    ProjectId: 2,
  },
  {
    SubjectId: 10,
    ProjectId: 3,
  },
  {
    SubjectId: 7,
    ProjectId: 4,
  },
  {
    SubjectId: 2,
    ProjectId: 3,
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
    starred: true,
    UserId: 3,
    ProjectId: 2,
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