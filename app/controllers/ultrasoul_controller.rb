class UltrasoulController < ApplicationController
	def hello
		render plain: 'Hello World!'
	end

	def top
	end

	def ready
	end

	attr_accessor :start_time, :end_time

	def get_time
		return Time.now
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


	def total_time
		start_time_second = self.start_time.min * 60 + self.start_time.sec
		end_time_second = self.end_time.min * 60 + self.end_time.sec
		time_second = end_time_second - start_time_second
		ultra_soul_time = 68 - time_second
		return ultra_soul_time
	end
end
