class UltrasoulController < ApplicationController
	def top
	end

	def about
	end

	def ready
	end

	def ultrasoul
		puts @start_time = Time.now
	end

	def result
		puts ultrasoul
		@time = total_time(ultrasoul, Time.now)
		@message = ultra(@time)
	end

	def ultra(soul)
		words = %w(ウルトラソウルパーフェクト ウルトラソウルグッド 平凡ソウル やり直し)

		if soul <= 2 && soul >= 0
		  return words[0]
		elsif soul <= 5 && soul >= 0
		  return words[1]
		elsif soul <= 10 && soul >= 0
		  return words[2]
		else
		  return words[3]
		end
	end


	def total_time(start_time, end_time)
		start_time_second = start_time.min * 60 + start_time.sec
		end_time_second = end_time.min * 60 + end_time.sec
		time_second = end_time_second - start_time_second
		ultra_soul_time = 68 - time_second
		return ultra_soul_time
	end
end
