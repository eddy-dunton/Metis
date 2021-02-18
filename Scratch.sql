-- I exclusively use this to write out SQL queries whilst I'm trying to figure them out
-- Assume the contents of this file have no value at all

-- SQLite
SELECT UnitCode, UnitName 
	FROM Unit 
		JOIN UnitEnrollment 
			ON Unit.UnitId = UnitEnrollment.UnitId
		JOIN User 
			ON User.UserId = UnitEnrollment.UserId 
			AND Username = "tester";

SELEC