# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Assumptions

1. Agents table has agentId as primary key which is being used in report.
2. There is a need to create new table for new agentIds. Table will consist of facilityId, agentId and new facilityAgentId.
3. `getShiftsByFacility` function will return some metadata about agent assigned to each shift which has agentId (primary key from Agents table).
4. Instead of returning agentId as metadata, we need to return new facilityAgentId for each agent in that report.

### Tickets

BE: Backend
FE: Frontend

1. [BE] New table creation in the database.
    - Acceptance Criteria: 
      - new table with name `fc_custom_agent_id`. (fc is for facilities. assuming all facility related tables start with fc)
      - Table should have 3 columns. i.e. `facility_id`, `agent_id`, `facility_agent_id`
    - Time/Effort Estimates: 1 Hr
    - Implementation Details:
      - Table Name: `fc_custom_agent_id`
      - Columns: 
        - `facility_id`: foreign key from facility table (INTEGER)
        - `agent_id`: foreign key from agent table (INTEGER)
        - `facility_agent_id`: new key (VARCHAR)

2. [FE-BE] facility custom key feature
    - Acceptance Criteria: 
      - This is a new feature on frontend. facility dashboard should have new custom agent id input box (required) in addition to all other existing details.
      - Input should be updated in `facility_agent_id` column in `fc_custom_agent_id` table.
    - Time/Effort Estimates: 6 Hr
    - Implementation Details:
      - Table Name: `fc_custom_agent_id`
      - New Input Field on frontend: (required field as all agents need to be uniquely identified)

3. [BE] changes in quaterly report generation
    - Acceptance Criteria: 
      - Instead of `agent_id` from Agents table, we need custom agent id from `fc_custom_agent_id` in final generated report.
    - Time/Effort Estimates: 3 Hr
    - Implementation Details:
      - in agent metadata in `getShiftsByFacility` function, instead of returning `agent_id` from Agents table, we need to return custom agent id from `fc_custom_agent_id` table.
      - we will get custom agent id based on `facility_id` from `getShiftsByFacility`'s argument and `agent_id` from Shifts table.
      - we will need to create SQL join on Shifts table and `fc_custom_agent_id` table on `agent_id`'s from both tables. we need to retrieve `facility_agent_id` from `fc_custom_agent_id` table after SQL join.

