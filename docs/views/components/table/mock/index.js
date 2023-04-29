import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import users from './users.json'
import userCols from './userCols.json'

const mock = new MockAdapter(axios, { delayResponse: 200 })

mock.onGet('/users').reply((config) => {
  const { page, pageSize, fullName, position, registrationDate, age, id, order } = config.params

  let filteredUsers = users

  const term = fullName ? fullName.toLowerCase() : ''
  const pos = Array.isArray(position) ? position : []
  const fromDate = registrationDate?.[0] ? new Date(registrationDate[0]).setHours(0, 0, 0, 0) : null
  const toDate = registrationDate?.[1] ? new Date(registrationDate[1]).setHours(0, 0, 0, 0) : null

  filteredUsers = filteredUsers
    .filter((user) => {
      return user.fullName.toLowerCase().includes(term)
    })
    .filter((user) => {
      return pos.length === 0 || pos.includes(user.position)
    })
    .filter((user) => {
      const fromDateValid = !fromDate || new Date(user.registrationDate).setHours(0, 0, 0, 0) >= fromDate

      const toDateValid = !toDate || new Date(user.registrationDate).setHours(0, 0, 0, 0) <= toDate

      return fromDateValid && toDateValid
    })
    .filter((user) => {
      const fromAgeValid = typeof age?.from !== 'number' || user.age >= age.from

      const toAgeValid = typeof age?.to !== 'number' || user.age <= age.to

      return fromAgeValid && toAgeValid
    })
    .filter((user) => {
      return !id || user.id === id
    })

  const [sortBy, orderBy] = order

  switch (sortBy) {
    case 'id':
      filteredUsers.sort((a, b) => {
        if (orderBy === 'asc') {
          return a.id - b.id
        } else {
          return b.id - a.id
        }
      })
      break
    case 'fullName':
      filteredUsers.sort((a, b) => {
        if (orderBy === 'asc') {
          return a.fullName.localeCompare(b.fullName)
        } else {
          return b.fullName.localeCompare(a.fullName)
        }
      })
      break
    case 'registrationDate':
      filteredUsers.sort((a, b) => {
        if (orderBy === 'asc') {
          return new Date(a.registrationDate) - new Date(b.registrationDate)
        } else {
          return new Date(b.registrationDate) - new Date(a.registrationDate)
        }
      })
      break
    default:
      break
  }

  const data = {
    users: {
      rows: filteredUsers,
      count: filteredUsers.length
    }
  }
  const start = (page - 1) * pageSize
  const end = start + pageSize
  data.users.rows = data.users.rows.slice(start, end)
  return [200, data]
})
mock.onGet('/usersSearch').reply((config) => {
  const { fullName, limit } = config.params

  if (!fullName) {
    return [200, { users: [] }]
  }

  let filteredUsers = users

  if (fullName) {
    const query = fullName.toLowerCase()
    filteredUsers = filteredUsers.filter((user) => user.fullName.toLowerCase().includes(query))
  }

  const data = {
    users: filteredUsers.slice(0, limit)
  }
  return [200, data]
})

mock.onGet('/userCols').reply(() => {
  const data = {
    userCols: userCols
  }
  return [200, data]
})

mock.onGet('/positions').reply(() => {
  const positionsSet = new Set()

  for (const user of users) {
    positionsSet.add(user.position)
  }

  const positions = []

  for (const position of positionsSet) {
    positions.push({ label: position, value: position })
  }

  const data = {
    positions
  }
  return [200, data]
})

export default axios

// import { faker } from '@faker-js/faker'
//
// const users = []
//
// for (let i = 0; i < 220; i++) {
//   const user = {
//     id: i + 1,
//     fullName: faker.name.fullName(),
//     position: faker.name.jobType(),
//     age: faker.datatype.number({ min: 18, max: 60 }),
//     registrationDate: faker.date.past()
//   }
//   users.push(user)
// }
//
// console.log(JSON.stringify(users, null, 2))
