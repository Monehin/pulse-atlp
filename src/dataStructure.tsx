const root = {
  users: [
    {
      uuid: '<uuid4>',
      firstname: 'string',
      lastname: 'string',
      email: 'email',
      password: '',
      role: ['admin'],
      photo: '<url>',
      createdAt: '<Date>',
    },
    {
      uuid: '<uuid4>',
      firstname: 'string',
      lastname: 'string',
      email: 'email',
      password: '',
      role: ['trainee'],
      createdAt: '<Date>',
      cohortId: 1,
      ratings: {
        '<programId>': [
          {
            createAt: '<Date>',
            'critical thinking': 1,
            attendance: 1,
            week: 1,
          },
        ],
      },
      programs: [
        {
          id: '<program id>',
          started: '<Date>',
          promoted: '<Date>',
          managerId: '<user uuid4>',
        },
      ],
    },
  ],
  invites: [
    {
      uuid: '<uuid4>',
      firstname: 'string',
      lastname: 'string',
      email: 'email',
      password: '',
      role: ['admin'],
      photo: '<url>',
      createdBy: '<uuid4>',
      createdAt: '<Date>',
    },
  ],
  programs: [
    {
      id: '<uuid4>',
      title: 'Bootcamp',
      duration: 2, // weeks
      createdAt: '',
      prerequisiteProgramId: "empty | <another program's id>",
      traineeCount: 0,
      ratingCadence: 1, // value in weeks
      ratingAttributes: [
        {
          title: 'Critical Thinking',
          description: '',
          graphic: '<Icon name>',
        },
        {
          title: 'Attendance',
          description: '',
          graphic: '<Icon name>',
        },
      ],
    },
    {
      id: '<uuid4>',
      name: 'Project work',
      duration: 3, // months
      createdAt: '',
      ratingAttributes: [
        {
          title: 'Quantity',
          description: '',
          graphic: '<Icon name>',
        },
        {
          title: 'Quality',
          description: '',
          graphic: '<Icon name>',
        },
      ],
      ratingCadence: 1, // value in weeks
    },
  ],
  cohorts: [
    {
      id: 1,
      createdAt: '<Date>',
      programDates: {
        '<program id for bootcamp>': {
          starts: '<Date>',
          ends: '<Date>',
        },
      },
    },
  ],
};

export default root;
