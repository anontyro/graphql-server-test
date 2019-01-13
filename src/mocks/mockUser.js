
export const MOCK_USER_CONSTS = {
  NAME :{ key: 'name', value: 'anontyro'} ,
  ID: { key: 'id', value: '12345'},
  FIRSTNAME: { key: 'firstname', value: 'alex'},
  LASTNAME: { key: 'lastname', value: 'wilkinson'},
  YEAR_REGISTERED: { key: 'yearregistered', value: '2015'},
  LAST_LOGIN: { key: 'lastlogin', value: '2019/01/05'},
  COUNTRY: { key: 'country', value: 'Singapore'},
  STATE_OR_PROVINCE: { key: 'stateorprovince', value: null},
}

export const mockUser = {
  'name':[
    {'$': 
      {
          value: MOCK_USER_CONSTS.NAME.value,
      }
    }
  ],
  'id':[
    {'$': 
      {
          value: MOCK_USER_CONSTS.ID.value,
      }
    }
  ],
  'firstname':[
    {'$': 
      {
          value: MOCK_USER_CONSTS.FIRSTNAME.value,
      }
    }
  ],
  'lastname':[
    {'$': 
      {
          value: MOCK_USER_CONSTS.LASTNAME.value,
      }
    }
  ],
  'yearregistered':[
    {'$': 
      {
          value: MOCK_USER_CONSTS.YEAR_REGISTERED.value,
      }
    }
  ],
  'lastlogin':[
    {'$': 
      {
          value: MOCK_USER_CONSTS.LAST_LOGIN.value,
      }
    }
  ],
  'country':[
    {'$': 
      {
          value: MOCK_USER_CONSTS.COUNTRY.value,
      }
    }
  ],
  'stateorprovince':[
    {'$': 
      {
          value: MOCK_USER_CONSTS.STATE_OR_PROVINCE.value,
      }
    }
  ],
}